import { createSlice} from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    currentUser: null,
    error: null,
    isAuthorized: false,
};

export const usersSlice = createSlice({
    name: 'user', 
    initialState,

    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setLogout: (state) => {
        state.loginData = null;
        state.isAuthorized = false;
      },

      setLoginSuccess: (state, action) => {
        state.loginData = action.payload;
        state.isAuthorized = true;
      },
    }
})

    export const {
        setLoginSuccess, 
        setRegisteredDataToStore,
        setLogout,
        setUser,
      } = usersSlice.actions
    
    export default usersSlice.reducer