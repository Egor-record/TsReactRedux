import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postState} from "../store/types";
import {deletePost} from "../api/postAPI";

const initialState : postState = {
    activePostId: "",
    loading: 'idle',
    error: "",
};


export const deleteOnePost = createAsyncThunk(
    'post/deleteOnePost',
    async (id : String) => {
        return await deletePost(id);
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setActivePostID: (state, action)=>{
            state.activePostId = action.payload;
        }
    },
});

export const { setActivePostID  } = postSlice.actions;

export default postSlice.reducer;