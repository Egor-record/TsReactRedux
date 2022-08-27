import { createSlice } from "@reduxjs/toolkit";
import {sendNewPostData} from "../api/newPostAPI";
import getUnixTime from 'date-fns/getUnixTime'
import {Post, newPostState, PostResponse} from "../store/types";


const initialState: newPostState = {
    value: {
        _id: "",
        text: "",
        time: getUnixTime(new Date()),
        post: true
    },
}

const sendForm = (post: Post) => {
    sendNewPostData(post).then((response : PostResponse) =>{
        console.log(response);
    }).catch((e: Error)=>{
        console.log(e);
    })
};

export const newPostSlice = createSlice({
    name: 'newPost',
    initialState,
    reducers: {
        createNewPost: (state, action) => {
            state.value = action.payload;
            sendForm(state.value)
        },
    }
});

export const { createNewPost } = newPostSlice.actions;

export default newPostSlice.reducer;