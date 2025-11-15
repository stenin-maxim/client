import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        setProductsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProductsError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})

export const { setProducts, setProductsLoading, setProductsError } = productSlice.actions;
export default productSlice.reducer;