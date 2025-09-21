import { createSlice } from '@reduxjs/toolkit'

const userProductSlice = createSlice({
    name: 'userProduct',
    initialState: {userProducts: null},
    reducers: {
        setUserProductAll(state, action) {
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
        },
        getUserProductById(state, action) {
            const userProductId = action.payload;
            const product = state.userProducts.find(item => item.id === userProductId);

            return { ...state, currentProduct: product };
        },
        updateUserProduct(state, action) {
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
    updateUserProductValue, 
    removeUserProduct, 
    getUserProductById,
    updateUserProduct,
    addUserProduct
} = userProductSlice.actions;
export default userProductSlice.reducer;