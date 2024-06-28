import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  masterData:null
};

export const MasterDataSlice = createSlice({
  name: 'master',
  initialState: initialState,
  reducers: {
    setMasterData(state, action) {
<<<<<<< HEAD
      state.masterData  = action.payload;
=======
      state.masterData = action.payload;
>>>>>>> 0a8e21f40f7961f635a63266d4723872b360361f
    },
  },
});

export const { setMasterData } = MasterDataSlice.actions;
export default MasterDataSlice.reducer;
