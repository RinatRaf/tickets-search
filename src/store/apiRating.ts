import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ratingApi = createApi({
    reducerPath: 'ratingAPI',
    tagTypes: ['Film'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3030/api/v1`,
        headers: { 'Content-Type': 'application.json', 'Authorization': `Bearer ${localStorage.getItem('user_token')}` }
    }),
    endpoints: builder => ({
        rateFilm: builder.mutation<unknown, { movieId: 14, user_rate: 2 }>({
                        
            query: (params) => ({
                url: `rateMovie`,
                method: 'POST',
                body: params
            }),
            invalidatesTags: (_, __, params) => [{ type: 'Film', id: params.movieId }],
        })
    })
})

type rateFilmHook = typeof ratingApi.endpoints.rateFilm.useMutation;
export const useRateMovieMutation: rateFilmHook = ratingApi.endpoints.rateFilm.useMutation;