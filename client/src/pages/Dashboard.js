import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogoutButton from '../components/Auth/GoogleLogoutButton';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';
import { useFetchCarQuery } from '../store';
import CarSearchPage from './CarSearchPage';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import { selectAllCars } from '../slices/carSlice';

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const { data = {}, error, isFetching } = useFetchCarQuery();
	const navigate = useNavigate();
	// useSelector is a hook provided by react-redux that allows you to extract data from the Redux store state.
	// It is used to select a slice of the state managed by Redux and make it available to your React component.
	const cars = useSelector(selectAllCars);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	let content;
	if (isFetching) {
		content = (
			<Skeleton
				times={20}
				className='h-10 w-full'
			/>
		);
	} else if (error) {
		content = <div>Error handling car data</div>;
	} else {
		content = (
			<div className='h-20 w-auto flex flex-row justify-between items-center bg-blue-400'>
				<Button
					onClick={() => navigate('/form')}
					className='ml-3 text-yellow-300'
					rounded
					danger
				>
					Create Car Data
				</Button>
				<SearchBar
					searchTerm={searchTerm}
					handleSearchChange={handleSearchChange}
				/>
				<GoogleLogoutButton />
			</div>
		);
	}

	return (
		<>
			{content}
			<div>
				<CarSearchPage
					cars={cars} // Pass cars array correctly
					searchTerm={searchTerm}
				/>
			</div>
		</>
	);
};

export default Dashboard;
