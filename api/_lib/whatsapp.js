import axios from 'axios';

/**
 * Format date from YYYY-MM-DD to DD-MM-YYYY for WhatsApp template
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Date in DD-MM-YYYY format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Format guests count for WhatsApp template
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children
 * @returns {string} Formatted guest string (e.g., "2 Adults, 1 child")
 */
export const formatGuests = (adults, children) => {
  const adultsText = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}`;
  if (children === 0) {
    return adultsText;
  }
  const childrenText = `${children} ${children === 1 ? 'child' : 'children'}`;
  return `${adultsText}, ${childrenText}`;
};

/**
 * Send WhatsApp template message using Meta WhatsApp Cloud API
 * @param {string} to - Recipient phone number (without +)
 * @param {string} templateName - Name of the approved template
 * @param {Array} parameters - Array of template parameters
 * @returns {Promise<Object>} API response with message ID
 */
export const sendTemplateMessage = async (to, templateName, parameters) => {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error('WhatsApp credentials not configured');
  }

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  
  const payload = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: parameters
        }
      ]
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || 
      'Failed to send WhatsApp message'
    );
  }
};
