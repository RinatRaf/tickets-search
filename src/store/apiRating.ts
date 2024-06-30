import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ratingApi = createApi({
    reducerPath: 'ratingAPI',
    tagTypes: ['Film'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3030/api/v1`,
        headers: { 'Content-Type': 'application.json', 'Authorization': `Bearer ${localStorage.getItem('user_token')}` }
    }),
    endpoints: builder => ({
        rateFilm: builder.mutation<unknown, { FilmId: string, user_rate: number }>({
            query: (params) => ({
                url: `rateMovie`,
                method: 'POST',
                body: params
            }),
            invalidatesTags: (_, __, params) => [{ type: 'Film', id: params.FilmId }],
            // onQueryStarted: async (arg, api) => {
            //     await api.queryFulfilled;
            //     api.dispatch(FilmsApi.util.invalidateTags([{ type: 'Film', id: arg.FilmId }]))
            // }
        })
    })
})

type rateFilmHook = typeof ratingApi.endpoints.rateFilm.useMutation;
export const useRateMovie: rateFilmHook = ratingApi.endpoints.rateFilm.useMutation;