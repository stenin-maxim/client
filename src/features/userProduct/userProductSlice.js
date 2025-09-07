import { createSlice } from '@reduxjs/toolkit'

const userProductSlice = createSlice({
    name: 'userProduct',
    initialState: {userProducts: null},
    reducers: {
        setUserProducts(state, action) {
            state.userProducts = action.payload;
        },
        updateUserProductValue(state, action) {
            const { id, value } = action.payload; 
            const updateValue = state.userProducts.find(item => item.id === id);
            if (updateValue) {
                updateValue.status = value;
            }
        },
        removeUserProduct(state, action) {
            let userProductId = action.payload;
            state.userProducts = state.userProducts.filter(item => item.id !== userProductId);
        }
    }
})
export const { setUserProducts,updateUserProductValue, removeUserProduct } = userProductSlice.actions;
export default userProductSlice.reducer;