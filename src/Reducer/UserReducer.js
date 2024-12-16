import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    setUsers: (state, action) => {
      console.log("Mise à jour des utilisateurs dans Redux:", action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      return state.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((user) => user._id !== idToDelete);
    },
  },
});

export const { addUser, setUsers, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
