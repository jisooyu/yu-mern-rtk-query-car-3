import { Routes, Route } from 'react-router-dom';
import { useFetchUserQuery } from './store';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CarForm from './pages/CarForm';
import CarEditForm from './pages/CarEditForm';

function App() {
	const { data: user, error, isLoading } = useFetchUserQuery();
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/dashboard'
					element={
						user ? (
							<Dashboard />
						) : (
							<div>Please log in to access the dashboard.</div>
						)
					}
				/>
				<Route
					path='/form'
					element={<CarForm />}
				/>
				<Route
					path='/edit/:id'
					element={<CarEditForm />}
				/>
			</Routes>
		</>
	);
}

export default App;
