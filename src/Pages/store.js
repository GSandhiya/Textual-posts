import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice'; // assuming you will create this

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
