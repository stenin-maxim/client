import { createSlice } from '@reduxjs/toolkit'

const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken, error: null },
    reducers: {
        setToken(state, action) {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        logout(state) {
            state.accessToken = null;
            state.error = null;
            localStorage.removeItem('accessToken'); // delete token from storage
        }
    }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;