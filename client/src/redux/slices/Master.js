import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  masterData:null
};

export const MasterDataSlice = createSlice({
  name: 'master',
  initialState: initialState,
  reducers: {
    setMasterData(state, action) {
      state.masterData  = action.payload;
    },
  },
});

export const { setMasterData } = MasterDataSlice.actions;
export default MasterDataSlice.reducer;
