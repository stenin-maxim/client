import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userProductReducer from '../features/userProduct/userProductSlice'
import { productApi } from '../api/productApi';

export const store = configureStore({
	reducer: {
        auth: authReducer,
        userProduct: userProductReducer,
        [productApi.reducerPath]: productApi.reducer, // Добавляем редьюсер RTK Query
        // другие редьюсеры
    },
    // Добавляем middleware для RTK Query
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware),
});
