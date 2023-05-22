import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from "../Chat/Chat";
import Quiz from "../quiz/Quiz";
import {query, collection, onSnapshot} from "firebase/firestore";
import { fetchMessages, sendMessage } from "../../redux/actions/chat/actionChat";
import { dbFirestore, dbQuiz } from "../../firebase";
import {fetchMessagesSuccess} from "../../redux/slices/chatSlice";
import {fetchQuizesSuccess} from "../../redux/slices/quizSlice";
import {fetchQuestionsSuccess} from "../../redux/slices/questionSlice";
import "./MainPage.css";
import { parseData } from '../quiz/AllQuest';
import { updateDoc, doc, getDoc } from "firebase/firestore";

function MainPage() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);

  const fetchMainData = ()=> {
    //afterSnapshot это ф-я вызыв, когда что-то меняется в коллекции 
    const afterSnapshot = (querySnapshot, functionToDispatch) => {
      let dataArr = []
      querySnapshot.forEach((doc) => {
        dataArr.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp && doc.data().timestamp.seconds && new Date(doc.data().timestamp.seconds * 1000)});
      });
      dispatch(functionToDispatch(dataArr));
    }
  //24-27 это ссылки на коллекции  firestore 
    const qmessages = query(collection(dbFirestore, 'messages'));
    const qquizes = query(collection(dbQuiz, 'quizes'));
    const qquestions = query(collection(dbQuiz, 'questions'));

    //ниже созд подписку на изменен в коллекциях 
    const unsubscribeMes = onSnapshot(qmessages, (querySnapshot) => afterSnapshot(querySnapshot, fetchMessagesSuccess));
    const unsubscribeQuiz = onSnapshot(qquizes, (querySnapshot) => afterSnapshot(querySnapshot, fetchQuizesSuccess));
    const unsubscribeQuest = onSnapshot(qquestions, (querySnapshot) => afterSnapshot(querySnapshot, fetchQuestionsSuccess) );


  
  } //эта ф-я получ данные 

   
  useEffect(() => {
    const unsubscribe = fetchMainData(); 
/*     return () => {
      unsubscribe();
    }; */
  }, [dispatch]);

/* //перетягиваю распарсенные данные 
  useEffect(() => {
    updateDoc(doc(dbQuiz, 'questions', "9M0JbgLgySVJx6HIbEbY"), {
      questions: parseData()
})
  }, []);

 */
  function handleSendMessage(event) {
    event.preventDefault();
    const text = event.target.elements.message.value.trim();
    if (text) {
      dispatch(sendMessage(text));
      event.target.reset();
    }
  }

  return (
    <div className='mainLayout'>
      <Quiz />
      <Chat />
    </div>
  );
}

export default MainPage;
