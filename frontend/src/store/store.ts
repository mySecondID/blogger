import { configureStore } from '@reduxjs/toolkit';
import { newPostReducer } from '../features/newPostSlice';


export const store = configureStore({
    reducer: newPostReducer
})