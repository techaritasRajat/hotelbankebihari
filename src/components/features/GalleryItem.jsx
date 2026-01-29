import { useState } from 'react';
import './GalleryItem.css';
import { Image, Modal } from '../ui';

function GalleryItem({ image, className = '' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`gallery-item ${className}`} onClick={handleClick}>
        <Image src={image.src} alt={image.alt || 'Gallery image'} />
        {image.caption && (
          <div className="gallery-item-overlay">
            <p className="gallery-item-caption">{image.caption}</p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="gallery-item-modal">
          <Image src={image.src} alt={image.alt || 'Gallery image'} />
          {image.caption && <p className="gallery-item-modal-caption">{image.caption}</p>}
        </div>
      </Modal>
    </>
  );
}

export default GalleryItem;
