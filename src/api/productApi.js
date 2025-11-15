import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setProducts, setProductsLoading, setProductsError } from '@/features/productSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const productApi = createApi({
    reducerPath: 'productApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
    }),
    tagTypes: ['Products'], // Теги для кэширования
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: "GET",
            }), // Определяет конечную точку GET запроса
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setProductsLoading(true));
                    const { data } = await queryFulfilled;
                    // Сохраняем данные в productSlice
                    dispatch(setProducts(data.data || data || []));
                } catch (error) {
                    dispatch(setProductsError(error.message || 'Ошибка загрузки продуктов'));
                }
            },
        }),
    })
})

export const { useGetProductsQuery } = productApi;