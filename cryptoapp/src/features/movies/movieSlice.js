import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi"
import { apikey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
        const movieText = "Harry";
        const response = await movieApi.get(
            `?apiKey=${apikey}&s=${movieText}&type=movie`
        );
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async () => {
        const seriesText = "Friends";
        const response = await movieApi.get(
            `?apiKey=${apikey}&s=${seriesText}&type=series`
        );
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
        const response = await movieApi.get(
            `?apiKey=${apikey}&i=${id}&PLot=full`
        );
        return response.data;
    }
);

const initialState = {
    movies:{},
    shows: {},
    selectMovieOrShow:{},
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending,() => {
                console.log("pending");
            })
            .addCase(fetchAsyncMovies.fulfilled,(state,{payload}) => {
                console.log("fetched sucessfully");
                return { ...state, movies:payload}
            })
            .addCase(fetchAsyncMovies.rejected,() => {
                console.log("rejeccted");
            })
            .addCase(fetchAsyncShows.fulfilled,(state,{payload}) => {
                console.log("fetched sucessfully");
                return { ...state, shows:payload};
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled,(state,{payload}) => {
                console.log("fetched sucessfully");
                return { ...state, selectMovieOrShow:payload};
            })
    }
})

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMoviesOrShowDetail = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;