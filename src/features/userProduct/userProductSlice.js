import { createSlice } from '@reduxjs/toolkit'

const userProductSlice = createSlice({
    name: 'userProduct',
    initialState: {userProducts: null},
    reducers: {
        setUserProducts(state, action) {
            state.userProducts = action.payload;
        }
    }
})
export const { setUserProducts } = userProductSlice.actions;
export default userProductSlice.reducer;