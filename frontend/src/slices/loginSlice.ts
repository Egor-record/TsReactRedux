import {loginState, userState} from "../../store/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchLoginData} from "../../api/loginAPI";


const initialState: loginState = {
    user : {
        name: "",
        password: "",
    },
    isLogged : false,
    token : "",
}

export const sendLogin = createAsyncThunk(
    'login/sendLogin',
    async (data: userState) => {
        return await fetchLoginData(data, "login")
    }
)

export const fetchCreateAccount = createAsyncThunk(
    'login/fetchCreateAccount',
    async (data: userState) => {
        return await fetchLoginData(data, "create");
    }
)


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, action)=>{
            state.isLogged = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            return {
                ...state,
                token : action.payload.token,
                isLogged : true
            }
        }).addCase(sendLogin.rejected, (state, action)=> {
            return {
                ...state,
                token: "",
                isLogged : false
            }
        }).addCase(fetchCreateAccount.fulfilled,(state, action) => {
            return {
                ...state,
                user : action.payload.user,
                isLogged : true,
                token : action.payload.token
            }
        }).addCase(fetchCreateAccount.rejected, (state, action)=> {
            return {
                ...state,
                token: "",
                isLogged : false
            }
        })
    },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;