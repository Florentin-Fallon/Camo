import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: [],
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    setEvent: (state, action) => {
      console.log("Mise à jour des events dans redux", action.payload);
      return action.payload;
    },
    deleteEvent: (state, action) => {
      const eventToDelete = action.payload;
      return state.filter((event) => event._id !== eventToDelete);
    },
  },
});

export const { addEvent, setEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
