import { put } from "redux-saga/effects";
import { select, takeEvery } from "redux-saga/effects";
import quizActionTypes from "../actions/quiz/quizActionTypes";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {dbQuiz} from '../../firebase'
import {fetchQuizesSuccess} from "../slices/quizSlice"
import {fetchQuestionsSuccess} from "../slices/questionSlice"

function* fetchQuizes() {
    console.log("fetchQuizes")
    try {
      const quizesRef = collection(dbQuiz, "quizes");
        getDocs(quizesRef).then((querySnapshot) => {
        const quizes = [] ;   
            querySnapshot.forEach((doc) => {
              console.log("doc.data()",doc.data())
              quizes.push({id: doc.id, ...doc.data()});
            });
            console.log('snap', quizes);
            put(fetchQuizesSuccess(quizes));

        });
    } catch (error) {
      yield put({ type: quizActionTypes.FETCH_MESSAGES_FAILURE, payload: error });
    }
  }


  function* fetchQuestions() {
    try {
      const questionsRef = collection(dbQuiz, "questions");
        getDocs(questionsRef).then((querySnapshot) => {
        const questions = [] ;   
            querySnapshot.forEach((doc) => {
              console.log("doc.data()",doc.data())
              questions.push({id: doc.id, ...doc.data()});
            });
            console.log('snap', questions);
            put(fetchQuestionsSuccess(questions));

        });
    } catch (error) {
      yield put({ type: quizActionTypes.FETCH_MESSAGES_FAILURE, payload: error });
    }
  }
  
  export const quizSagas = [
    takeEvery(quizActionTypes.FETCH_QUIZES_REQUEST, fetchQuizes),
    takeEvery(quizActionTypes.FETCH_QUESTIONS_REQUEST, fetchQuestions)
  ];