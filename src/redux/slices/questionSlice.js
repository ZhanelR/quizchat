import {createSlice} from "@reduxjs/toolkit";

  const initialState = {
    loadedQuestions: [],
  }

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,

  reducers: {
      fetchQuestionsSuccess: (state, action) => {
        state.loadedQuestions = [...action.payload];
      },
   },

})
export const { fetchQuestionsSuccess } = questionsSlice.actions;
export default questionsSlice.reducer