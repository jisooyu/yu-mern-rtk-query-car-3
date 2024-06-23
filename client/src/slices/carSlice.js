import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const carAdapter = createEntityAdapter({
	selectId: (car) => car._id, // Use _id as the unique identifier
});

const carSlice = createSlice({
	name: 'car',
	initialState: carAdapter.getInitialState(),
	reducers: {
		setAllCars: carAdapter.setAll,
		addCar: carAdapter.addOne,
		updateCar: carAdapter.updateOne,
		removeCar: carAdapter.removeOne,
	},
});

export const { setAllCars, addCar, updateCar, removeCar } = carSlice.actions;
export default carSlice.reducer;
export const {
	selectAll: selectAllCars,
	selectById: selectCarById,
	selectIds: selectCarIds,
} = carAdapter.getSelectors((state) => state.car);
