import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLocation, setLocationLoading, setLocationError } from '@/features/locationSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const locationApi = createApi({
    reducerPath: 'locationApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
    }),
    tagTypes: ['Location'], // Теги для кэширования
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: () => ({
                url: 'location',
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLocationLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setLocation(data.data || []));
                } catch (error) {
                    dispatch(setLocationError(error.message || 'Ошибка загрузки локаций'));
                }
            },
        }),
    })
})

export const {
    useGetLocationQuery,
 } = locationApi;