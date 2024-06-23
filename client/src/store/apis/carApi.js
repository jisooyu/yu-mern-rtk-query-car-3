import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const carApi = createApi({
	reducerPath: 'carApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
	}),
	tagTypes: ['Car'],
	endpoints: (builder) => ({
		fetchCar: builder.query({
			query: () => '/car/fetch',
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Car', id })),
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
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		removeCar: builder.mutation({
			invalidatesTags: (result, error, id) => [
				{ type: 'Car', id },
				{ type: 'Car', id: 'LIST' },
			],
			query: (id) => ({
				url: `/car/delete/${id}`,
				method: 'DELETE',
			}),
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
