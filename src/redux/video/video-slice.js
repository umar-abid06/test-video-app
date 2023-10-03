/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isJoined: false,
  isLeft: false,
  participants: [],
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    joiningMeet: (state, {payload}) => {
      state.isJoined = true;
      state.isLeft = false;
      state.participants = payload;
    },
    leavingMeet: (state, {payload}) => {
      state.isJoined = false;
      state.isLeft = true;
      state.participants = [];
    },
  },
});
export const {joiningMeet, leavingMeet} = videoSlice.actions;
export default videoSlice.reducer;
