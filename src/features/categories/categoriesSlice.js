import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    loading: false,
    error: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
            state.loading = false
            state.error = null
        },
        setCategoriesLoading: (state, action) => {
            state.loading = action.payload
        },
        setCategoriesError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        clearCategoriesError: (state) => {
            state.error = null
        }
    }
})

export const { 
    setCategories, 
    setCategoriesLoading, 
    setCategoriesError, 
    clearCategoriesError 
} = categoriesSlice.actions

export default categoriesSlice.reducer