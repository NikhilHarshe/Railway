import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ContractorSlice from "./slices/ContractorSlice";
import VendorSlice from "./slices/VendorSlice";
<<<<<<< HEAD
import  MasterDataSlice  from "./slices/Master";


export const store = configureStore({
    reducer : {
        auth: AuthSlice,
        contractor : ContractorSlice,
        vendor: VendorSlice,
        master: MasterDataSlice
    }
})
=======
import MasterDataSlice  from "./slices/Master";


export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    contractor: ContractorSlice,
    vendor: VendorSlice,
    master: MasterDataSlice,
  },
});
>>>>>>> 0a8e21f40f7961f635a63266d4723872b360361f

