import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Reducer/UserReducer'

export const store = configureStore({
    reducer: {
        users: userReducer,
    }
})