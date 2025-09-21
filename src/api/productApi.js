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
            providesTags: ['Product'], // Помечаем данные тегом для инвалидации
        }),
        publishUserProduct: builder.mutation({
            query: (productId) => ({
                url: `product/publish/${productId}`,
                method: "PATCH",
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после публикации
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `product/${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после обновления
            // Принудительно обновляем данные после успешного обновления
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Дополнительно обновляем кэш для конкретного продукта
                    dispatch(
                        productApi.util.updateQueryData('getUserProductAll', undefined, (draft) => {
                            if (draft?.data) {
                                const index = draft.data.findIndex(product => product.id === parseInt(id));
                                if (index !== -1) {
                                    draft.data[index] = { ...draft.data[index], ...data };
                                }
                            }
                        })
                    );
                } catch (error) {
                    console.error('Ошибка при обновлении кэша:', error);
                }
            },
        }),
        deleteUserProduct: builder.mutation({
            query: (productId) => ({ 
                url: `product/${productId}`,
                method: "DELETE",
            })
        })
    }),
})

// Экспортируем хуки, которые были автоматически сгенерированы RTK Query
export const { 
    useGetUserProductAllQuery,
    useUpdateProductMutation,
    usePublishUserProductMutation,
    useDeleteUserProductMutation
} = productApi;