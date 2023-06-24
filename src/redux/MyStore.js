import {configureStore} from "@reduxjs/toolkit";
import MyProductReducer from '../redux/MyProductSlice';

export const myStore = configureStore({
    reducer: {
        product: MyProductReducer
    },
});