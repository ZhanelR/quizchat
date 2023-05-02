import { all } from "redux-saga/effects";
import { chatSagas } from "./chatSaga";

export default function* rootSaga() {
  console.log('rootsaga')
    yield all([
        ...chatSagas,
      ])
  }

