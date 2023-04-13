import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { chatReducer } from "../Slices/chatSlice"; // добавляем импорт вашего chatSlice.reducer
import { chatSagas } from './rootSagas';
import { usersSlice } from "../Slices/usersSlice";

const firebaseConfig = { /* конфигурация Firebase */ };
firebase.initializeApp(firebaseConfig);
const { reducer: usersReducer, setUser, setLogout } = usersSlice;
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  chat: chatReducer, // добавляем ваш chatSlice.reducer в rootReducer
  user: usersSlice.reducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(chatSagas);

export default store;





/* //старый стор 
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import userReducer from '../Slices/usersSlice';
import rootSaga from "./rootSagas";
import chatReducer from '../Slices/chatSlice';


const sagaMiddleware = createSagaMiddleware();

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  });

const store = configureStore({
    reducer: {
        user: userReducer, 
        chat: chatReducer,
    },
    middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export { sagaMiddleware, store };
 */