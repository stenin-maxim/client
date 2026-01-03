import { createSlice } from '@reduxjs/toolkit'

const userProductSlice = createSlice({
    name: 'userProduct',
    initialState: {userProducts: []},
    reducers: {
        setUserProductAll(state, action) {
            state.userProducts = action.payload;
        },
        updateUserProductStatus(state, action) { // TODO
            const { id, value } = action.payload; 
            const updateValue = state.userProducts.find(item => item.id === id);
            if (updateValue) {
                updateValue.status = value;
            }
        },
        removeUserProduct(state, action) {
            let userProductId = action.payload;
            state.userProducts = state.userProducts.filter(item => item.id !== userProductId);
        },
        updateUserProduct(state, action) { // TODO
            const { id, updatedProduct } = action.payload;
            const index = state.userProducts.findIndex(item => item.id === id);
            
            if (index !== -1) {
                // Обновляем продукт, сохраняя все существующие поля и добавляя новые
                state.userProducts[index] = { 
                    ...state.userProducts[index], 
                    ...updatedProduct,
                    id: id // Убеждаемся, что ID остается корректным
                };
            }
        },
        addUserProduct(state, action) {
            const newProduct = action.payload;
            // Добавляем новый продукт в начало массива
            state.userProducts = [newProduct, ...state.userProducts];
        }
    }
})
export const { 
    setUserProductAll, 
    updateUserProductStatus, 
    removeUserProduct, 
    updateUserProduct,
    addUserProduct
} = userProductSlice.actions;
export default userProductSlice.reducer;