import { configureStore } from '@reduxjs/toolkit';
import { carApi } from './apis/carApi';
import { authApi } from './apis/authApi';
import carReducer from '../slices/carSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		car: carReducer,
		[authApi.reducerPath]: authApi.reducer,
		[carApi.reducerPath]: carApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(carApi.middleware, authApi.middleware);
	},
});

setupListeners(store.dispatch);

export {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} from './apis/carApi';
export { useFetchUserQuery } from './apis/authApi';
