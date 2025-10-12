import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import userProductReducer from '@/features/userProduct/userProductSlice';
import categoriesReducer from '@/features/categories/categoriesSlice';
import { productApi } from '@/api/productApi';
import { categoriesApi } from '@/api/categoriesApi';

export const store = configureStore({
	reducer: {
        auth: authReducer,
        userProduct: userProductReducer,
        categories: categoriesReducer,
        [productApi.reducerPath]: productApi.reducer, // Добавляем редьюсер RTK Query
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        // другие редьюсеры
    },
    // Добавляем middleware для RTK Query
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productApi.middleware,
            categoriesApi.middleware
        ),
});
