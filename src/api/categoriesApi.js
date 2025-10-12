import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCategories, setCategoriesLoading, setCategoriesError } from '@/features/categories/categoriesSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
    }),
    tagTypes: ['Categories'], // Теги для кэширования
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: 'category',
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setCategoriesLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setCategories(data.data || []));
                } catch (error) {
                    dispatch(setCategoriesError(error.message || 'Ошибка загрузки категорий'));
                }
            },
        }),
    })
})

export const { useGetCategoriesQuery } = categoriesApi;