import {configureStore} from '@reduxjs/toolkit';
import newPostReducer from "../slices/newPostSlice";
import feedReducer from "../slices/feedSlice"
import alertReducer from "../slices/alertSlice"
import postReducer from "../slices/postSlice"
import loginReducer from "../slices/loginSlice";

export const store = configureStore({
  reducer: {
    newPost: newPostReducer,
    feed: feedReducer,
    alert: alertReducer,
    post : postReducer,
    login : loginReducer
  },
});

export type AppDispatch = typeof store.dispatch;
