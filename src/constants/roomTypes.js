export const roomTypes = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Spacious and comfortable room with modern amenities and a beautiful view.',
    price: 150,
    image: '/images/rooms/deluxe.jpg',
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar'],
    featured: false,
  },
  {
    id: 'suite',
    name: 'Heritage Suite',
    description: 'Luxurious suite with separate living area and premium amenities.',
    price: 250,
    image: '/images/rooms/suite.jpg',
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar', 'Living Room', 'Balcony'],
    featured: true,
  },
  {
    id: 'executive',
    name: 'Executive Room',
    description: 'Premium room designed for business travelers with work desk and high-speed internet.',
    price: 200,
    image: '/images/rooms/executive.jpg',
    amenities: ['Wi-Fi', 'TV', 'AC', 'Work Desk', 'Mini Bar'],
    featured: false,
  },
  {
    id: 'family',
    name: 'Family Room',
    description: 'Perfect for families with extra space and connecting rooms available.',
    price: 300,
    image: '/images/rooms/family.jpg',
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar', 'Extra Beds', 'Kitchenette'],
    featured: false,
  },
];

export default roomTypes;
