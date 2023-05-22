import  quizActionTypes  from "./quizActionTypes";

export function fetchQuizes() {
  return { type: quizActionTypes.FETCH_QUIZES_REQUEST };
}

export function fetchQuestions() {
    return { type: quizActionTypes.FETCH_QUESTIONS_REQUEST };
}

