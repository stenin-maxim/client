import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import userProductReducer from '@/features/userProduct/userProductSlice';
import categoriesReducer from '@/features/categories/categoriesSlice';
import productReducer from '@/features/productSlice';
import locationReducer from '@/features/locationSlice'; 
import { productApi } from '@/api/productApi';
import { userProductApi } from '@/api/userProductApi';
import { categoriesApi } from '@/api/categoriesApi';
import { locationApi } from '@/api/locationApi';

export const store = configureStore({
	reducer: {
        auth: authReducer,
        userProduct: userProductReducer,
        categories: categoriesReducer,
        product: productReducer,
        location: locationReducer,
        [productApi.reducerPath]: productApi.reducer,
        [userProductApi.reducerPath]: userProductApi.reducer, // Добавляем редьюсер RTK Query
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
        // другие редьюсеры
    },
    // Добавляем middleware для RTK Query
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productApi.middleware,
            userProductApi.middleware,
            categoriesApi.middleware,
            locationApi.middleware,
        ),
});
