import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import chatReducer from "./slices/chatSlice"; 
import userReducer from "./slices/usersSlice";
import quizesReducer from "./slices/quizSlice";
import questionsReducer from "./slices/questionSlice";



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer, 
        chat: chatReducer,
        questions: questionsReducer,
        quizes: quizesReducer
    },
    middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export { sagaMiddleware, store };




