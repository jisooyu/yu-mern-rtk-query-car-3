import React from 'react';
import CarDetails from './CarDetails';

function CarSearchPage({ cars, searchTerm }) {
	if (!Array.isArray(cars)) {
		return <div>Error: Cars data is not an array.</div>;
	}

	const filteredCars = cars.filter((car) =>
		car.modelName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<CarDetails cars={filteredCars} />
		</>
	);
}

export default CarSearchPage;
