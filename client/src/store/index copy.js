import { configureStore } from '@reduxjs/toolkit';
import carApi from './apis/carApi';
import { authApi } from './apis/authApi';
import { extendedApiSlice } from '../slices/carSlice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[carApi.reducerPath]: carApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(carApi.middleware, authApi.middleware);
	},
});

export {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} from '../slices/carSlice'; // Ensure correct path
