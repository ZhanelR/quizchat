import {LOG_IN, LOG_OUT} from "./userActionTypes";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { put, call } from "redux-saga/effects";
import { message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"

export default function* rootSaga() {
    yield all([
        ...loginSagas,
      ])
    
  }

  function* handleLogin(action) {
    try {
      // Получаем доступ к сервису аутентификации Firebase.
      const auth = yield call(() => getAuth());
  
      // Запускаем процесс аутентификации через Google.
      const provider = new GoogleAuthProvider();
      const googleUserCredential = yield signInWithPopup(auth, provider);
  
      // Получаем уникальный идентификатор пользователя.
      const uid = googleUserCredential.user.uid;
  
      // Создаем пользователя в базе данных Firebase, используя его уникальный идентификатор.
      yield call(() => setDoc(doc(db, "users", uid), { email: googleUserCredential.user.email }));
  
      // Вызываем сагу, указывая, что авторизация прошла успешно.
      yield put(setLoginSuccess(googleUserCredential));
    } catch (error) {
      message.info('Failed to authorize user:  ' + error);
    }
  }

  
  function* handleLogout() {
    try {
      // Получаем доступ к сервису аутентификации Firebase.
      const auth = yield call(() => getAuth());
  
      // Выходим из системы Firebase.
      yield signOut(auth);
  
      // Удаляем данные о входе из локального хранилища.
      localStorage.removeItem("loginData");
  
      // Вызываем сагу, указывая, что выход из системы произошел успешно.
      yield put(setLogout());
    } catch (error) {
      message.info('Failed to log out: ' + error);
    }
  }

 export const loginSagas = [
    takeEvery(LOG_IN, handleLogin),
    takeEvery(LOG_OUT, handleLogout),
 ]