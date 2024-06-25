import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	setAllCars,
	addCar,
	updateCar,
	removeCar,
} from '../../slices/carSlice';
import { store } from '../../store';

const carApi = createApi({
	reducerPath: 'carApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
	}),
	tagTypes: ['Car'],
	endpoints: (builder) => ({
		fetchCar: builder.query({
			query: () => '/car/fetch',
			transformResponse: (response) => {
				store.dispatch(setAllCars(response));
				return response;
			},
			providesTags: (result) =>
				result
					? [
							...result.map(({ _id }) => ({ type: 'Car', id: _id })),
							{ type: 'Car', id: 'LIST' },
					  ]
					: [{ type: 'Car', id: 'LIST' }],
		}),
		addCar: builder.mutation({
			query: (car) => ({
				url: '/car/save',
				method: 'POST',
				body: car,
			}),
			onQueryStarted: async (car, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(addCar(data));
				} catch (error) {
					console.error('Add car failed', error);
				}
			},
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		removeCar: builder.mutation({
			query: (id) => ({
				url: `/car/delete/${id}`,
				method: 'DELETE',
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(removeCar(id));
				} catch (error) {
					console.error('Remove car failed', error);
				}
			},
			invalidatesTags: (result, error, id) => [
				{ type: 'Car', id },
				{ type: 'Car', id: 'LIST' },
			],
		}),
		editCar: builder.mutation({
			query: ({ id, formDataObject }) => ({
				url: `/car/update/${id}`,
				method: 'PUT',
				body: formDataObject,
			}),
			onQueryStarted: async (
				{ id, formDataObject },
				{ dispatch, queryFulfilled }
			) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(updateCar({ id, changes: data }));
				} catch (error) {
					console.error('Edit car failed', error);
				}
			},
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		fetchCarById: builder.query({
			query: (id) => `/car/fetchDataById/${id}`,
			transformResponse: (response) => response, // Transform if necessary
			providesTags: (result, error, id) => [{ type: 'Car', id }],
		}),
	}),
});

export const {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} = carApi;

export { carApi };
