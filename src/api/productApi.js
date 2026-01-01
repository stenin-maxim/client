import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toggleProductFavorite } from '@/features/productSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const productApi = createApi({
    reducerPath: 'productApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('accessToken'); // Или из Redux state
            if (token) 
                headers.set('authorization', `Bearer ${token}`);
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Product'], // Теги для кэширования
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params = {}) => {
                const { city, category, subcategory } = params;
                let url = city ? `/${city}` : '';

                if (city && category) url += `/${category}`;
                if (city && category && subcategory) url += `/${subcategory}`;
                
                return { url, method: "GET" }
            },
            providesTags: ['Product'], // Помечаем данные тегом
        }),
        getProductByUlid: builder.query({
            query: ({ulid}) => ({
                url: `/product/${ulid}`,
                method: 'GET',
            }),
        }),
        toggleFavorite: builder.mutation({
            query: (product_ulid) => ({
                url: '/favorites/toggle',
                method: "POST",
                body: {product_ulid},
            }),
            invalidatesTags: ['Product'],
            // Мгновенное обновление UI до ответа сервера
            async onQueryStarted(product_ulid, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(toggleProductFavorite(product_ulid));
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo(); // Если в слайсе нет undo, просто вызовите toggle еще раз при ошибке
                    dispatch(toggleProductFavorite(product_ulid));
                }
            },
        }),
    })
})

export const { useGetProductsQuery, useGetProductByUlidQuery, useToggleFavoriteMutation } = productApi;
