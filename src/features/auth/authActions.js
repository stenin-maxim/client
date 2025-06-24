import { createAsyncThunk } from '@reduxjs/toolkit'
//import 'dotenv/config'

const baseUrl = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
    'auth/login',
    async( {email, password}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                return data;
            } else {
                alert('Ошибка входа');
            }
        } catch(error) {
             return rejectWithValue(error.message)
        }
    }
)

export const userRegister = createAsyncThunk(
    'auth/register',
    async ({name, email, password}, {rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) { // Обработка успешной регистрации
                alert('Регистрация успешна!');
            } else {
                alert('Ошибка регистрации');
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
