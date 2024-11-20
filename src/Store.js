import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Reducer/UserReducer'
import authReducer from './Reducer/AuthReducer'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer
    }
})