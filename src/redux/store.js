/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import videoSlice from './video/video-slice';

const store = configureStore({
  reducer: {
    video: videoSlice,
  },
});

export default store;
