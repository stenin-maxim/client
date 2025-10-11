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
            }
            return headers;
        },
    }),
    tagTypes: ['Product'], // Теги для кэширования
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getUserProductAll: builder.query({
            query: () => ({
                url: 'product',
                method: "GET",
            }), // Определяет конечную точку GET запроса
            providesTags: ['Product'], // Помечаем данные тегом для инвалидации
            keepUnusedDataFor: 300, // кэш 5 минут
            refetchOnMountOrArgChange: false, // не перезапрашивать без надобности
        }),
        createProduct: builder.mutation({
            query: (formData) => ({
                url: 'product',
                method: 'POST',
                body: formData,
                // Не устанавливаем Content-Type - браузер установит multipart/form-data автоматически
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после создания
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
        }),
        statusProduct: builder.mutation({
            query: ({ productId, status }) => ({
                url: `product/${productId}/status`,
                method: "PATCH",
                body: {status: status},
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после публикации
        })
    }),
})

// Экспортируем хуки, которые были автоматически сгенерированы RTK Query
export const {
    useGetProductByIdQuery,
    useGetUserProductAllQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteUserProductMutation,
    useStatusProductMutation,
} = productApi;