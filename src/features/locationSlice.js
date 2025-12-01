import { createSlice } from '@reduxjs/toolkit'

// Загружаем cityUser из localStorage при инициализации
const loadCityUserFromStorage = () => {
    try {
        const stored = localStorage.getItem('cityUser');
        if (!stored) return null;
        
        // Проверяем, что это не пустая строка
        if (stored.trim() === '') return null;
        
        const parsed = JSON.parse(stored);
        // Проверяем, что это объект с нужными полями
        if (parsed && typeof parsed === 'object' && parsed.slug) {
            return parsed;
        }
        return null;
    } catch (error) {
        console.error('Error loading cityUser from localStorage:', error);
        // Очищаем некорректные данные
        try {
            localStorage.removeItem('cityUser');
        } catch (e) {
            // Игнорируем ошибку удаления
        }
        return null;
    }
};

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        location: [],
        loading: false,
        error: null,
        cityUser: loadCityUserFromStorage(),
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLocationLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLocationError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setUserCity: (state, action) => {
            state.cityUser = action.payload;
            // Сохраняем в localStorage
            try {
                localStorage.setItem('cityUser', JSON.stringify(action.payload));
            } catch (error) {
                console.error('Error saving cityUser to localStorage:', error);
            }
        },
        clearUserCity: (state) => {
            state.cityUser = null;
            // Удаляем из localStorage
            try {
                localStorage.removeItem('cityUser');
            } catch (error) {
                console.error('Error removing cityUser from localStorage:', error);
            }
        },
    }
})

export const {
    setLocation,
    setLocationLoading,
    setLocationError,
    setUserCity,
    clearUserCity,
} = locationSlice.actions;
export default locationSlice.reducer;