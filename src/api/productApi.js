import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const productApi = createApi({
    reducerPath: 'productApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Accept', 'application/json');
                
                // Для PATCH запросов с FormData не устанавливаем Content-Type
                // чтобы браузер автоматически установил multipart/form-data с boundary
                if (endpoint !== 'updateProduct') {
                    headers.set('Content-Type', 'application/json');
                }
            }
            return headers;
        },
    }),
    tagTypes: ['Product'], // Теги для кэширования
    endpoints: (builder) => ({
        getUserProductAll: builder.query({
            query: () => ({
                url: 'product',
                method: "GET",
            }), // Определяет конечную точку GET запроса
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `product/${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после обновления
        }),
    }),
})

// Экспортируем хуки, которые были автоматически сгенерированы RTK Query
export const { useGetUserProductAllQuery, useUpdateProductMutation } = productApi;