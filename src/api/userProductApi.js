import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toggleProductFavorite } from '@/features/productSlice';
import { addFavorite, removeFavorite } from '@/features/userProduct/userProductSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const userProductApi = createApi({
    reducerPath: 'userProductApi', // Путь к редьюсеру для Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Базовый URL для запросов
        prepareHeaders: (headers) => {
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
        getUserProductAll: builder.query({
            query: () => ({
                url: '/user/product',
                method: "GET",
            }), // Определяет конечную точку GET запроса
            providesTags: ['Product'], // Помечаем данные тегом для инвалидации
            keepUnusedDataFor: 300, // кэш 5 минут
            refetchOnMountOrArgChange: false, // не перезапрашивать без надобности
            // Не блокировать UI при загрузке - показывать кэшированные данные, если они есть
            refetchOnFocus: false,
            refetchOnReconnect: true,
        }),
        createProduct: builder.mutation({
            query: (formData) => ({
                url: '/user/product',
                method: 'POST',
                body: formData,
                // Не устанавливаем Content-Type - браузер установит multipart/form-data автоматически
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после создания
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/user/product/${id}`,
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
                        userProductApi.util.updateQueryData('getUserProductAll', undefined, (draft) => {
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
                url: `/user/product/${productId}`,
                method: "DELETE",
            })
        }),
        statusProduct: builder.mutation({
            query: ({ productId, status }) => ({
                url: `/user/product/${productId}/status`,
                method: "PATCH",
                body: {status: status},
            }),
            invalidatesTags: ['Product'], // Инвалидирует кэш после публикации
        }),

        toggleFavorite: builder.mutation({
            query: ({product}) => ({
                url: '/favorites/toggle',
                method: "POST",
                body: {product_ulid: product.ulid},
            }),
            invalidatesTags: ['Favorites'],
            // Мгновенное обновление UI до ответа сервера
            async onQueryStarted({product}, { dispatch, queryFulfilled }) {
                dispatch(toggleProductFavorite(product));
                
                try {
                    const { data } = await queryFulfilled; //Ожидаем ответ от сервера

                    if (data.data.is_favorite) {
                        dispatch(addFavorite(data.data));
                    } else {
                        dispatch(removeFavorite(data.data.ulid));
                    }
                    
                } catch {
                    dispatch(toggleProductFavorite(product));
                }
                
            },
        }),
        getFavoriteUserProducts: builder.query({
            query: () => ({
                url: '/user/favorites',
                method: "GET",
            }),
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
    useToggleFavoriteMutation,
    useGetFavoriteUserProductsQuery,
} = userProductApi;