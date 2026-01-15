import { createSlice } from '@reduxjs/toolkit'
import { userProductApi } from '@/api/userProductApi';

const userProductSlice = createSlice({
    name: 'userProduct',
    initialState: {
        userProducts: [],
        favorites: [],
        loading: false,
    },
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
        },

        addFavorite: (state, action) => {
            const product = action.payload;
            if (!state.favorites.includes(product.ulid)) {
                state.favorites.push(product);
            }
        },
        removeFavorite: (state, action) => {
            const ulid = action.payload;
            state.favorites = state.favorites.filter(item => item.ulid !== ulid);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userProductApi.endpoints.getFavoriteUserProducts.matchFulfilled,
            (state, action) => {
                state.favorites = action.payload.data;
                state.loading = false;
            }
        )
    }
})
export const { 
    setUserProductAll, 
    updateUserProductStatus, 
    removeUserProduct, 
    updateUserProduct,
    addUserProduct,
    addFavorite,
    removeFavorite,
} = userProductSlice.actions;
export default userProductSlice.reducer;