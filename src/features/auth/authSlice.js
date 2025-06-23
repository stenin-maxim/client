import { createSlice } from '@reduxjs/toolkit'
import { login } from './authActions'

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken, error: null },
    reducers: {
        setCredentials(state, action) {
            state.accessToken = action.payload;
        },
        logout(state) {
            state.accessToken = null;
            state.error = null;
            localStorage.removeItem('accessToken'); // delete token from storage
        }
    },
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => { // в ожидании
            state.error = null
        }),
        builder.addCase(login.fulfilled, (state, action) => { // выполнено
            state.accessToken = action.payload.accessToken
        })
        builder.addCase(login.rejected, (state, action) => { // отклонено
            state.error = action.payload
        })
    }
	
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;