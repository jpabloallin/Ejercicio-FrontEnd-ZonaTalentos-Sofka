import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "../features/authentication/loggedInSlice"

export const store = configureStore({
    reducer: {
        logged: loggedInReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;