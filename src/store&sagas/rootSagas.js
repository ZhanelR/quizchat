//import {LOG_IN, LOG_OUT} from "./userActionTypes";
//import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { put, call } from "redux-saga/effects";
import { message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { all, takeLatest } from "redux-saga/effects";
//import { setLoginSuccess, setLogout } from "../Slices/usersSlice";
import { chatActionTypes } from "./chats/ActionTypesChat";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function* rootSaga() {
    yield all([
        ...chatSagas,
      ])
  }


  function* fetchMessages() {
    try {
      const querySnapshot = yield call(
        firebase.firestore().collection('messages').orderBy('timestamp', 'asc').get
      );
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      yield put({ type: chatActionTypes.FETCH_MESSAGES_SUCCESS, payload: messages });
    } catch (error) {
      yield put({ type: chatActionTypes.FETCH_MESSAGES_FAILURE, payload: error });
    }
  }
  
  /* Сага fetchMessages используется для загрузки сообщений из коллекции 'messages' в Firestore. 
  Сначала вызывается функция call, которая вызывает метод get коллекции 'messages' от Firebase, 
  и результат сохраняется в переменную querySnapshot.
  Далее данные из querySnapshot преобразуются в массив объектов сообщений с помощью метода map 
  и сохраняются в переменную messages.
  Затем вызывается метод put, который создает action с типом FETCH_MESSAGES_SUCCESS и payload 
  с данными messages.
  Если возникла ошибка при выполнении запроса, то вместо действий с переменной messages 
  вызывается action с типом FETCH_MESSAGES_FAILURE и передается объект ошибки.

 */
  function* sendMessage({ payload: text }) {
    try {
      const currentUser = firebase.auth().currentUser;
      const message = {
        text,
        userName: currentUser.displayName,
        userAva: currentUser.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const docRef = yield call(firebase.firestore().collection('messages').add, message);
      const docSnapshot = yield call(docRef.get);
      const newMessage = { id: docSnapshot.id, ...docSnapshot.data() };
      yield put({ type: chatActionTypes.SEND_MESSAGE_SUCCESS, payload: newMessage });
    } catch (error) {
      yield put({ type: chatActionTypes.SEND_MESSAGE_FAILURE, payload: error });
    }
  }

  /* Сага sendMessage используется для отправки сообщения в Firestore. 
  Сначала вызывается функция call, которая вызывает метод add коллекции 'messages' 
  от Firebase с данными нового сообщения.
Полученный документ сохраняется в переменной docRef.
Далее вызывается функция call, которая вызывает метод get документа, чтобы получить данные 
добавленного сообщения.
Полученные данные сохраняются в переменной newMessage.
Затем вызывается метод put, который создает action с типом SEND_MESSAGE_SUCCESS и payload 
с данными newMessage.
Если возникла ошибка при выполнении запроса, то вместо действий с переменной newMessage 
вызывается action с типом SEND_MESSAGE_FAILURE и передается объект ошибки.
   */
  
  export function* chatSagas() {
    yield takeLatest(chatActionTypes.FETCH_MESSAGES_REQUEST, fetchMessages);
    yield takeLatest(chatActionTypes.SEND_MESSAGE_REQUEST, sendMessage);
  }

/*  //ниже сага для логирования. но я написала его через контекст 
    function* handleLogin(action) {
    try {
      // Получаем доступ к сервису аутентификации Firebase.
      const auth = yield call(() => getAuth()); 
      // Запускаем процесс аутентификации через Google.
      const provider = new GoogleAuthProvider();
      const googleUserCredential = yield signInWithPopup(auth, provider);
        console.log(googleUserCredential)
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
 ] */