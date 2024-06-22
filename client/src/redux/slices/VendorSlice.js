import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditVendor: false,
    vendorsData: localStorage.getItem("vendors") ? JSON.parse(localStorage.getItem("vendors")) : null,
};

const vendorSlice = createSlice({
    name: "vendor",
    initialState: initialState,
    reducers: {
        setVendorsData(state, action) {
            state.vendorsData = action.payload;
            // Optionally, you might want to store updated vendorsData in localStorage
            localStorage.setItem("vendors", JSON.stringify(action.payload));
        },
        setIsEditVendor(state, action) {
            state.isEditVendor = action.payload;
        },
    },
});

export const { setVendorsData, setIsEditVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
