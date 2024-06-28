import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ContractorSlice from "./slices/ContractorSlice";
import VendorSlice from "./slices/VendorSlice";
import  MasterDataSlice  from "./slices/Master";


export const store = configureStore({
    reducer : {
        auth: AuthSlice,
        contractor : ContractorSlice,
        vendor: VendorSlice,
        master: MasterDataSlice
    }
})

