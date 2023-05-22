import { all } from "redux-saga/effects";
import { chatSagas } from "./chatSaga";
import {quizSagas} from "./quizSaga"

export default function* rootSaga() {
  console.log('rootsaga')
    yield all([
        ...chatSagas,
        ...quizSagas,      
      ])
  }

