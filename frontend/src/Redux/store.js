import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducers/counterSlice'
import postReducer from './reducers/postSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
    posts:postReducer, // Handle the posts state with the post reducer
  },
})