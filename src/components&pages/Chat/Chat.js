import {useState, useRef} from "react"
import { useDispatch, useSelector } from "react-redux";
import {sendMessage} from "../../redux/actions/chat/actionChat";
import "./Chat.css"

function Chat() {
  const dispatch = useDispatch();
  const inputMessage = useRef();
  const messages = useSelector((state) => state.chat.messages);

  // сортировка сообщений по времени создания
  //const sortedMessages = messages.slice().sort((a, b) => a.createdAt - b.createdAt);

  function scrollToBottom() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function handleNewMessage() {
    const message = inputMessage.current.value;
    dispatch(sendMessage(message));
  }

  return (
    <div className="chat-container" id="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-messages">
        <ul className="chat-list">
          {messages.map((message) => (
            <li key={message.id} className="chat-message">
              <img
                className="user-avatar"
                src={message.userAva}
                alt={message.userName}
              />
              <div>
                <span className="user-name">{message.userName}</span>
                <span className="message-text">{message.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input type="text" ref={inputMessage} />
        <button
          onClick={() => {
            handleNewMessage();
            inputMessage.current.value = "";
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;