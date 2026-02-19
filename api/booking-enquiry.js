import { sendTemplateMessage, formatDate, formatGuests } from './_lib/whatsapp.js';

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format (basic validation)
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate booking enquiry data
 */
const validateBookingData = (data) => {
  const errors = [];

  // Required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phone) {
    errors.push('Phone is required');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Invalid phone format');
  }

  if (!data.checkIn) {
    errors.push('Check-in date is required');
  }

  if (!data.checkOut) {
    errors.push('Check-out date is required');
  }

  // Date validation
  if (data.checkIn && data.checkOut) {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      errors.push('Check-in date must be today or in the future');
    }

    if (checkOutDate <= checkInDate) {
      errors.push('Check-out date must be after check-in date');
    }
  }

  // Adults validation
  const adults = parseInt(data.adults);
  if (!data.adults || isNaN(adults)) {
    errors.push('Number of adults is required');
  } else if (adults < 1 || adults > 10) {
    errors.push('Number of adults must be between 1 and 10');
  }

  // Children validation (optional, defaults to 0)
  const children = parseInt(data.children || 0);
  if (isNaN(children) || children < 0 || children > 5) {
    errors.push('Number of children must be between 0 and 5');
  }

  return errors;
};

/**
 * Main serverless function handler
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const bookingData = req.body;

    // Validate incoming data
    const validationErrors = validateBookingData(bookingData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: validationErrors.join(', ')
      });
    }

    // Extract and format data for WhatsApp template
    const {
      name,
      email,
      phone,
      checkIn,
      checkOut,
      adults,
      children = 0
    } = bookingData;

    // Format dates for template (DD-MM-YYYY)
    const formattedCheckIn = formatDate(checkIn);
    const formattedCheckOut = formatDate(checkOut);

    // Format guests string
    const guestsText = formatGuests(parseInt(adults), parseInt(children));

    // Prepare template parameters in correct order
    const templateParameters = [
      { type: 'text', text: name },                    // Parameter 1: Guest Name
      { type: 'text', text: email },                   // Parameter 2: Email
      { type: 'text', text: phone },                   // Parameter 3: Phone
      { type: 'text', text: formattedCheckIn },        // Parameter 4: Check-in
      { type: 'text', text: formattedCheckOut },       // Parameter 5: Check-out
      { type: 'text', text: guestsText }               // Parameter 6: Guests
    ];

    // Get configuration from environment variables
    const hotelManagerPhone = process.env.HOTEL_MANAGER_PHONE;
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

    if (!hotelManagerPhone || !templateName) {
      throw new Error('WhatsApp configuration incomplete');
    }

    // Send WhatsApp message
    const whatsappResponse = await sendTemplateMessage(
      hotelManagerPhone,
      templateName,
      templateParameters
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Booking enquiry sent successfully',
      messageId: whatsappResponse.messages?.[0]?.id || 'unknown'
    });

  } catch (error) {
    console.error('Booking enquiry error:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process booking enquiry'
    });
  }
}
