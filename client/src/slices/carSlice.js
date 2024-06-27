// Assuming you've already imported createSelector and createEntityAdapter
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { carApi } from '../store/apis/carApi';

const carAdapter = createEntityAdapter({
	selectId: (car) => car._id, // Use _id as the unique identifier,
	sortComparer: (a, b) => a.modelName.localeCompare(b.modelName),
});

const initialState = carAdapter.getInitialState();

export const extendedApiSlice = carApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchCar: builder.query({
			query: () => '/car/fetch',
			// to normalize the raw data from the backend server
			transformResponse: (response) => {
				try {
					return carAdapter.setAll(initialState, response);
				} catch (error) {
					console.error('Error transforming response data:', error);
					return initialState;
				}
			},
			// to manage cacheing, note: the result is from transformResponse
			providesTags: (result, error, arg) => {
				try {
					const tags = [
						{ type: 'Car', id: 'LIST' },
						...(result.ids
							? result.ids.map((id) => ({
									type: 'Car',
									id: arg?.contentId ?? id,
							  }))
							: []),
					];
					return tags;
				} catch (error) {
					console.error('Error generating tags:', error);
					return [];
				}
			},
		}),
		addCar: builder.mutation({
			query: (car) => ({
				url: '/car/save',
				method: 'POST',
				body: car,
			}),
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		removeCar: builder.mutation({
			query: (id) => ({
				url: `/car/delete/${id}`,
				method: 'DELETE',
			}),
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
} = extendedApiSlice;

// returns the query result object (entire objects)
export const selectCarResult = extendedApiSlice.endpoints.fetchCar.select();

// creates memoized selector
const selectCarData = createSelector(
	selectCarResult,
	(carResult) => carResult.data ?? initialState // normalized state object with ids & entities
);

export const {
	selectAll: selectAllCars,
	selectById: selectCarById,
	selectIds: selectCarIds,
	// Pass in a selector that returns the car slice of state
} = carAdapter.getSelectors((state) => selectCarData(state));
