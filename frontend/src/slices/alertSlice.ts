import {AlertState} from "../store/types";
import {createSlice} from "@reduxjs/toolkit";


const initialState : AlertState = {
    opened: "none"
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        fetchAlert: (state, action  ) => {state.opened = action.payload}
    },
});

export const { fetchAlert } = alertSlice.actions;

export default alertSlice.reducer;