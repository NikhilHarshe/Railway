import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const initialState = {
  user: null,
  Token: localStorage.getItem('Token')
    ? JSON.parse(localStorage.getItem('Token'))
    : null,
  contractors: localStorage.getItem('contractors')
    ? JSON.parse(localStorage.getItem('contractors'))
    : null,
};

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers : ({
        setUser(state, action) {
            state.user = action.payload
        },
        setToken(state, action){
            state.Token = action.payload
        },
        logOut(state){
            toast.error("Log Out Successful");
            setUser(null),
            setToken(null)
            localStorage.removeItem("Token");
            console.log("logOut in slice");
        },
        setContractors(state,action) {
            state.contractors = action.payload
        }
    })

})

export const { setUser, setToken, logOut, setContractors } = AuthSlice.actions;
export default AuthSlice.reducer