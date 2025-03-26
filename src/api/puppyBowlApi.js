// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API using createApi
export const puppyBowlApi = createApi({
    // Unique string used in constructing Redux action types, state selectors, and React hook names
    reducerPath: "puppyBowlApi",
    // Define a base query function that all endpoints will use as the base of their request
    baseQuery: fetchBaseQuery({
        // The base URL for all requests
        baseUrl: "https://fsa-puppy-bowl.herokuapp.com/api/2411-ftb-et-web-pt-amb",
    }),
    // Define endpoints for our API service
    endpoints: (builder) => ({
        // Define an endpoint that fetches all players
        players: builder.query({
            query: () => "/players",
            providesTags: ['Players'],
        }),
        // Define an endpoint that fetches a single player by ID
        player: builder.query({
            query: (id) => `/players/${id}`,
            providesTags: (result, error, id) => [{ type: 'Players', id }],
        }),
        // Define an endpoint to create a new player
        createPlayer: builder.mutation({
            query: (player) => ({
                url: "/players",
                method: "POST",
                body: player,
            }),
            invalidatesTags: ['Players'],
        }),
        // Define an endpoint to delete a player
        deletePlayer: builder.mutation({
            query: (id) => ({
                url: `/players/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Players'],
        }),
    }),
});

// Export hooks for each endpoint
export const {
    usePlayersQuery,
    usePlayerQuery,
    useCreatePlayerMutation,
    useDeletePlayerMutation,
} = puppyBowlApi;