import { configureStore } from '@reduxjs/toolkit';
import { carApi } from './apis/carApi';
import { authApi } from './apis/authApi';
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[carApi.reducerPath]: carApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(carApi.middleware, authApi.middleware);
	},
});

// setupListeners(store.dispatch);
export { useFetchUserQuery } from './apis/authApi';
export {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} from '../slices/carSlice';
