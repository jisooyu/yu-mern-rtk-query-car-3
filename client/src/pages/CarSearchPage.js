import CarDetails from './CarDetails';

function CarSearchPage({ data, searchTerm }) {
	const filteredData = data.filter((car) =>
		car.modelName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<CarDetails data={filteredData} />
		</>
	);
}

export default CarSearchPage;
