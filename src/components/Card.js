import React from 'react';

export const Card = ({ personaje, onClick }) => {
	// Función para determinar el color según la especie
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

	// Determina el color de fondo según la especie
	const cardStyle = {
		backgroundColor: getSpeciesColor(personaje.species),
	};

	return (
		<section
			className="personaje"
			onClick={() => onClick(personaje)}
			style={cardStyle}
			role="button"
			aria-label={`View details for ${personaje.name}`}
		>
			<div className="personaje-header">
				<div className="estado">
					<span className={personaje.status}></span>
					<h4>{personaje.status}</h4>
				</div>
			</div>

			<div className="personaje-body">
				<figure>
					<img src={personaje.image} alt={personaje.name} />
				</figure>

				<h2>{personaje.name}</h2>
				<p>
					{personaje.species} <span>-</span> {personaje.gender}
				</p>
			</div>
		</section>
	);
};
