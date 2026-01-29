import './RoomsPage.css';
import { RoomsSection } from '../components/sections';
import { roomTypes } from '../constants';

function RoomsPage() {
  const handleBookNow = (roomId) => {
    // Handle room booking
    console.log('Book room:', roomId);
  };

  return (
    <div className="rooms-page">
      <RoomsSection
        title="All Rooms"
        subtitle="Explore our complete selection of rooms and suites"
        rooms={roomTypes}
        onBookNow={handleBookNow}
      />
    </div>
  );
}

export default RoomsPage;
