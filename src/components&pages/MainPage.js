import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMessages, sendMessage } from "../store&sagas/chats/actionChat"

function MainPage() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  function handleSendMessage(event) {
    event.preventDefault();
    const text = event.target.elements.message.value.trim();
    if (text) {
      dispatch(sendMessage(text));
      event.target.reset();
    }
  }

  return (
    <div>
      {/* Отображение сообщений */}
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.userName}</div>
          <div>{message.text}</div>
        </div>
      ))}
      {/* Форма для отправки нового сообщения */}
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" placeholder="Введите сообщение" />
        <button type="submit" disabled={isLoading}>Отправить</button>
      </form>
      {/* Отображение ошибки */}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default MainPage;
