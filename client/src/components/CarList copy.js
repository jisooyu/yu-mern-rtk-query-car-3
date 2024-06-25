import React from 'react';
import { useFetchCarQuery } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';

const CarList = () => {
	const { data, error, isLoading } = useFetchCarQuery();
	console.log(`data is ${data}`);
	let content;
	if (isLoading) {
		content = <Skeleton times={3} />;
	} else if (error) {
		content = <div>Error loading albums.</div>;
	} else {
		content = data.map((car) => {
			const header = <div>{car.carMakerName}</div>;

			return (
				<ExpandablePanel
					key={car.modelName}
					header={header}
				>
					List of photos in the car
				</ExpandablePanel>
			);
		});
	}
	return <div>{content}</div>;
};

export default CarList;
