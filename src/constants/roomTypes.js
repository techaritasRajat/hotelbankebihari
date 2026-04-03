// Deluxe Room
import deluxeRoomOne from '../assets/images/rooms/deluxe-room/room-one.JPG';
import deluxeRoomTwo from '../assets/images/rooms/deluxe-room/room-two.JPG';
import deluxeRoomThree from '../assets/images/rooms/deluxe-room/room-three.png';

// Heritage Suite
import heritageSuiteOne from '../assets/images/rooms/heritage-suite/room-one.png';
import heritageSuiteTwo from '../assets/images/rooms/heritage-suite/room-two.png';
import heritageSuiteThree from '../assets/images/rooms/heritage-suite/room-three.png';

// Executive Room
import executiveRoomOne from '../assets/images/rooms/executive-room/room-one.JPG';
import executiveRoomTwo from '../assets/images/rooms/executive-room/room-two.JPG';
import executiveRoomThree from '../assets/images/rooms/executive-room/room-three.JPG';

// Family Room
import familyRoomOne from '../assets/images/rooms/family-room/room-one.JPG';
import familyRoomTwo from '../assets/images/rooms/family-room/room-two.JPG';
import familyRoomThree from '../assets/images/rooms/family-room/room-three.JPG';
import familyRoomFour from '../assets/images/rooms/family-room/room-four.JPG';

export const roomTypes = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Spacious and comfortable room with modern amenities and a beautiful view.',
    price: 150,
    images: [deluxeRoomOne, deluxeRoomTwo, deluxeRoomThree],
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar'],
    featured: false,
  },
  {
    id: 'suite',
    name: 'Heritage Suite',
    description: 'Luxurious suite with separate living area and premium amenities.',
    price: 250,
    images: [heritageSuiteOne, heritageSuiteTwo, heritageSuiteThree],
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar', 'Living Room', 'Balcony'],
    featured: true,
  },
  {
    id: 'executive',
    name: 'Executive Room',
    description: 'Premium room designed for business travelers with work desk and high-speed internet.',
    price: 200,
    images: [executiveRoomOne, executiveRoomTwo, executiveRoomThree],
    amenities: ['Wi-Fi', 'TV', 'AC', 'Work Desk', 'Mini Bar'],
    featured: false,
  },
  {
    id: 'family',
    name: 'Family Room',
    description: 'Perfect for families with extra space and connecting rooms available.',
    price: 300,
    images: [familyRoomOne, familyRoomTwo, familyRoomThree, familyRoomFour],
    amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar', 'Extra Beds', 'Kitchenette'],
    featured: false,
  },
];

export default roomTypes;
