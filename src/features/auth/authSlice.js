import { createSlice } from '@reduxjs/toolkit'

const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null

const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken, error: null, user, avatar: null },
    reducers: {
        setToken(state, action) {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
            localStorage.setItem('avatar', action.payload);
        },
        logout(state) {
            state.accessToken = null;
            state.user = null;
            state.error = null;
            localStorage.removeItem('accessToken'); // delete token from storage
            localStorage.removeItem('user');
        }
    }
});

export const { logout, setToken, setUser, setAvatar } = authSlice.actions;
export default authSlice.reducer;