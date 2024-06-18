import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditContractor: false,
    contractors: localStorage.getItem('contractors')
        ? JSON.parse(localStorage.getItem('contractors'))
        : null,
}
export const contractorSlice = createSlice({
    name: "contractor",
    initialState: initialState,
    reducers: ({
        setContractors(state, action) {
            state.contractors = action.payload
        },
        setIsEditContractor(state, action) {
            state.isEditContractor = action.payload
        }
    })

})

export const { setContractors, setIsEditContractor } = contractorSlice.actions;
export default contractorSlice.reducer