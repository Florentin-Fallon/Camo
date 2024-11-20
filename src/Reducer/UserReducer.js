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
        updateUser: (state, action) => {
            const {id, updateData} = action.payload
            const userIndex = state.findIndex(user => user._id === id)
            if (userIndex !== -1){
                state[userIndex] = { ...state[userIndex], ...updateData}
            }
        }
    }
})

export const {addUser, setUsers, deleteUser, updateUser} = userSlice.actions
export default userSlice.reducer