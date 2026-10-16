import { useState } from 'react';
import { workGallery } from '../../data/workers';
import Modal from '../common/Modal';
import './WorkerGallery.css';
export default function WorkerGallery() {
  const [photo, setPhoto] = useState(null);
  return (
    <>
      <div className="worker-gallery">
        {workGallery.map((item) => (
          <button
            key={item.src}
            onClick={() => setPhoto(item)}
            aria-label={`Ampliar foto: ${item.title}`}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </button>
        ))}
      </div>
      {photo && (
        <Modal title={photo.title} onClose={() => setPhoto(null)}>
          <img className="gallery-enlarged" src={photo.src} alt={photo.title} />
          <p className="muted">{photo.detail} · Trabajo de ejemplo</p>
        </Modal>
      )}
    </>
  );
}
