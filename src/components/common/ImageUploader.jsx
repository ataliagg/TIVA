import { useId, useState } from 'react';
import Icon from './Icon';
import './ImageUploader.css';
export default function ImageUploader({ images, onChange, max = 3 }) {
  const id = useId();
  const [error, setError] = useState('');
  async function addFiles(event) {
    const files = [...event.target.files];
    event.target.value = '';
    setError('');
    if (files.length + images.length > max) {
      setError(`Podés agregar hasta ${max} fotos.`);
      return;
    }
    if (
      files.some(
        (file) =>
          !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
          file.size > 5 * 1024 * 1024,
      )
    ) {
      setError('Usá imágenes JPG, PNG o WebP de hasta 5 MB.');
      return;
    }
    try {
      const additions = await Promise.all(
        files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve({ name: file.name, src: reader.result });
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }),
        ),
      );
      onChange([...images, ...additions]);
    } catch {
      setError('No pudimos leer la imagen. Probá con otro archivo.');
    }
  }
  return (
    <div className="image-uploader">
      <div className="image-uploader-grid">
        {images.map((image, index) => (
          <div className="uploaded-image" key={`${image.name}-${index}`}>
            <img src={image.src} alt={`Adjunto: ${image.name}`} />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, i) => i !== index))}
              aria-label={`Quitar foto ${index + 1}`}
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
        {images.length < max && (
          <label className="upload-zone" htmlFor={id}>
            <Icon name="camera" size={26} />
            <strong>Agregar foto</strong>
            <span>JPG, PNG o WebP</span>
            <input
              id={id}
              aria-label="Adjuntar fotos"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={addFiles}
            />
          </label>
        )}
      </div>
      <p>Hasta {max} fotos · Máximo 5 MB por foto · Solo se muestran en esta sesión.</p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
