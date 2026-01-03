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
            } else {
                console.warn("Продукт не найден в стейте, невозможно переключить избранное");
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
        builder.addMatcher(
            productApi.endpoints.getProductByUlid.matchFulfilled,
            (state, action) => {
                const fetchedProduct = action.payload.data || action.payload; 
                if (!fetchedProduct) return; // Защита от пустых данных

                const index = state.products.findIndex(p => p.ulid === fetchedProduct.ulid);
                if (index === -1) {
                    state.products.push(fetchedProduct);
                } else {
                    state.products[index] = fetchedProduct;
                }
                state.loading = false;
            }
        );
    }
})

export const { toggleProductFavorite } = productSlice.actions;
export default productSlice.reducer;