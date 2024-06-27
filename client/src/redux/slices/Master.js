import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  masterData:null
};

export const MasterDataSlice = createSlice({
  name: 'MasterData',
  initialState: initialState,
  reducers: {
    setMasterData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setMasterData } = MasterDataSlice.actions;
export default MasterDataSlice.reducer;
