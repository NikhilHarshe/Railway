import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ContractorSlice from "./slices/ContractorSlice";


export const store = configureStore({
    reducer : {
        auth: AuthSlice,
        contractor : ContractorSlice,
    }
})

