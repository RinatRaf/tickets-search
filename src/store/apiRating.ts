import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilmsApi } from "./api";

export const ratingApi = createApi({
    reducerPath: 'ratingAPI',
    tagTypes: ['Film'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3030/api/v1`,
        prepareHeaders: (headers,) => {
            const token = localStorage.getItem('user_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: builder => ({
        rateFilm: builder.mutation<unknown, { movieId: string, user_rate: number  }>({
                        
            query: (params) => {
                console.log('Params for rateFilm:', params);
               return {
                url: `rateMovie`,
                method: 'POST',
                body: params
            }},
            invalidatesTags: (_, __, params) => [{ type: 'Film', id: params.movieId }],
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(FilmsApi.util.invalidateTags([{ type: 'Film', id: arg.movieId }]))
            }
        })
    })
})

type rateFilmHook = typeof ratingApi.endpoints.rateFilm.useMutation;
export const useRateMovieMutation: rateFilmHook = ratingApi.endpoints.rateFilm.useMutation;