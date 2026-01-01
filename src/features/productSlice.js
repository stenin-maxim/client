import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '@/api/productApi';

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        toggleProductFavorite: (state, action) => {
            const product = state.products.find(p => p.ulid === action.payload.product_ulid);
            if (product) {
                product.is_favorite = !product.is_favorite;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productApi.endpoints.getProducts.matchFulfilled,
            (state, action) => {
                state.products = action.payload.data || action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            productApi.endpoints.getProducts.matchPending,
            (state) => {
                state.loading = true;
            }
        );
    }
})

export const { toggleProductFavorite } = productSlice.actions;
export default productSlice.reducer;