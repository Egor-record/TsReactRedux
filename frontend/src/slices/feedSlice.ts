import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {feedState} from "../store/types";
import {getPosts} from "../api/feedAPI";


const initialState: feedState = {
    value: [
        {
            _id: "",
            text: "Загрузка",
            time: 32423525425,
            post: true
        }
    ],
    loading: 'idle',
    error: "",
}


export const getAllPosts = createAsyncThunk(
    'feed/getAllPosts',
    async () => {
       return await getPosts()
    }
)

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.value = action.payload
        })
    },
});

export default feedSlice.reducer;