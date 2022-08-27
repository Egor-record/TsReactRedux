import React from "react";

export type PostResponse = {
    status : Number,
    id : Number
}

export type loginResponse = {
    token: string,
    user : {
        name : string,
        password: string
    }
}

export type Post = {
    _id: string,
    text: string,
    time: Number,
    post: boolean
}

export interface newPostState {
    value: Post,
}

export interface feedState {
    value: Post[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: String,
}

export interface postState {
    activePostId: String
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: String,
}

export interface userState {
    name: string,
    password: string
}

export interface RootState {
    newPost: newPostState;
    feed: feedState;
    alert: AlertState;
    post: postState;
    login: loginState;
}

export interface loginState {
    user : userState,
    isLogged: boolean,
    token : string
}

export interface AlertState {
    opened: 'delete' | 'success' | 'none'
}

export type AlertBoxProps = {
    handleCloseAlert: () => void
    handleDeletePost: () => void
}

export type InputProps = {
    handleInputChange: (e : React.ChangeEvent<HTMLInputElement>) => void
    name : string
    placeholder : string
    label : string
    type: string
}


