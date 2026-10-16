import './Avatar.css';
export default function Avatar({ person, size = 'medium' }) {
  return (
    <span className={`avatar avatar-${size}`}>
      {person.photo ? (
        <img src={person.photo} alt={person.name} />
      ) : (
        <span aria-label={person.name}>
          {person.initials ||
            person.name
              .split(' ')
              .map((word) => word[0])
              .slice(0, 2)
              .join('')}
        </span>
      )}
    </span>
  );
}
