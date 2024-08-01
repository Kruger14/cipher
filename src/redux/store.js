import { configureStore } from "@reduxjs/toolkit";
import apireducer from "./reducer";

const store = configureStore({
    reducer: apireducer,
})

export default store;