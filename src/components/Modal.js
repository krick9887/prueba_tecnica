export const Modal = ({ personaje, onClose }) => {
  if (!personaje) {
    return null;
  }

  // Asignar un color de fondo basado en la especie
  const getSpeciesColor = (species) => {
    switch (species.toLowerCase()) {
      case 'human':
        return '#F5531D'; 
      case 'alien':
        return '#ff9800'; 
      case 'robot':
        return '#2196f3'; 
      case 'humanoid':
        return '#9c27b0'; 
        case 'animal':
        return '#E3F500';
      default:
        return '#9e9e9e';
    }
  };

  const backgroundColor = getSpeciesColor(personaje.species);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ backgroundColor }}>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
        <figure>
          <img src={personaje.image} alt={personaje.name} />
        </figure>
        <h2>{personaje.name}</h2>
        <p><strong>Especie:</strong> {personaje.species || 'Desconocida'}</p>
        <p><strong>Estado:</strong> {personaje.status || 'Desconocido'}</p>
        <p><strong>Género:</strong> {personaje.gender || 'Desconocido'}</p>
        <p><strong>Ubicación:</strong> {personaje.location?.name || 'Desconocida'}</p>
      </div>
    </div>
  );
};
