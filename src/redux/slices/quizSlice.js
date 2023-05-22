import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

  const initialState = {
    loadedQuizes: [],
  }

export const quizSlice = createSlice({
  name: 'quizes',
  initialState,

  reducers: {
      fetchQuizesSuccess: (state, action) => {
        console.log("fetchQuizesSuccess", action.payload)
        state.loadedQuizes = [...action.payload];
        
      },
   },

})
export const { fetchQuizesSuccess } = quizSlice.actions;
export default quizSlice.reducer