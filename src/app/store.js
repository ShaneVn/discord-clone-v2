import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channelSlice"
import ServerSlice from "../features/serverSlice"


export const store = configureStore({
    reducer: {
        channel: channelReducer,
        server: ServerSlice
    }
})