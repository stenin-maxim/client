import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userProductReducer from '../features/userProduct/userProductSlice'

export const store = configureStore({
	reducer: {
        auth: authReducer,
        userProduct: userProductReducer,
        // другие редьюсеры
    }
});
