import { useState, useEffect } from 'react';
import header from './assets/loading.png';
import { Filtrar } from './components/Filtrar';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import Login from './components/Login';  

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const charactersPerPage = 20;

  useEffect(() => {
    const getPersonajes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await response.json();
        setPersonajes(data.results);
        setTotalPages(data.info.pages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPersonajes();
  }, [currentPage]);

  const personjesFiltrados = personajes.filter(
    (personaje) =>
      personaje.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      personaje.species.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      personaje.status.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );  

  const openModal = (personaje) => {
    setSelectedPersonaje(personaje);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonaje(null);
  };

  // Si no está autenticado, muestra el formulario de login
  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  // Navegar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navegar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <figure className="logo">
        <img src={header} alt="Logo de Rick & Morty" />
      </figure>
      
      <Filtrar filter={filter} setFilter={setFilter} />

      <section className="lista-personajes">
        {loading ? (
          <p>Cargando...</p>
        ) : personjesFiltrados.length > 0 ? (
          personjesFiltrados.map((personaje) => (
            <Card
              key={personaje.id}
              personaje={personaje}
              onClick={openModal}
            />
          ))
        ) : (
          <p>
            No se encontró personajes, status o especie con la búsqueda{' '}
            <strong>"{filter}"</strong>.
          </p>
        )}
      </section>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>

      {isModalOpen && selectedPersonaje && (
        <Modal personaje={selectedPersonaje} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
