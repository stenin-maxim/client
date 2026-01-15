import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    })
})

export const { useGetProductsQuery, useGetProductByUlidQuery } = productApi;
