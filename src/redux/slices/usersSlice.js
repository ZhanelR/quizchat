import { createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentUser: null,
    isAuthorized: false,
};

export const usersSlice = createSlice({
    name: 'user', 
    initialState,

    reducers: {
      setUser: (state, action) => {
        state.currentUser = action.payload;
        state.isAuthorized = true;
      },
      setLogout: (state) => {
        state.currentUser = null;
        state.isAuthorized = false;
      },

   }
})

export const {
    setLogout,
    setUser,
  } = usersSlice.actions;
    
export default usersSlice.reducer