import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const socialApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/api/v1/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url:'/register',
        method:'POST',
        body:data
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url:'/login',
        method:'POST',
        body:data
      }),
    }),
  }),
});

export const { useCreateUserMutation,useLoginUserMutation } = socialApi;
