import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getUserDetails: build.query({
            query: () => ({
                url: 'api/profile',
                method: 'GET',
            }),
        }),
    }),
})

// export react hook
export const { useGetUserDetailsQuery } = authApi
