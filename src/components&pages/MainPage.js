import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from "./Chat/Chat";
import {query, collection, onSnapshot} from "firebase/firestore";
import { fetchMessages, sendMessage } from "../redux/actions/chat/actionChat";
import { dbFirestore } from "../firebase";
import {fetchMessagesSuccess} from "../redux/slices/chatSlice"

function MainPage() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  
  useEffect(() => {
    const q = query(collection(dbFirestore, 'messages')) 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {   
      let messagesArr = []
      querySnapshot.forEach((doc) => {
        messagesArr.push({...doc.data(), id: doc.title})
      });
      //отсортир массив сообщ sort (timestamp)
      dispatch(fetchMessagesSuccess(messagesArr))
    })},[dispatch])

  function handleSendMessage(event) {
    event.preventDefault();
    const text = event.target.elements.message.value.trim();
    if (text) {
      dispatch(sendMessage(text));
      event.target.reset();
    }
  }

  return (
   <Chat />
  );
}

export default MainPage;
