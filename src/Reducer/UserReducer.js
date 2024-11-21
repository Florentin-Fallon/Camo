import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        setUsers: (state, action) => {
            return action.payload
        },
        deleteUser: (state, action) => {
            const idToDelete = action.payload
            return state.filter(user => user._id !== idToDelete)
        },
    }
})

export const {addUser, setUsers, deleteUser} = userSlice.actions
export default userSlice.reducer