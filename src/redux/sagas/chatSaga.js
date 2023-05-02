import { put } from "redux-saga/effects";
import { select, takeEvery } from "redux-saga/effects";
import chatActionTypes from "../actions/chat/chatActionTypes";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {dbFirestore} from '../../firebase'
import {fetchMessagesSuccess} from "../slices/chatSlice"

function* fetchMessages() {
    try {
      const messagesRef = collection(dbFirestore, "messages");
        getDocs(messagesRef).then((querySnapshot) => {
        const messages = [] ;   
            querySnapshot.forEach((doc) => {
              console.log("doc.data()",doc.data())
              messages.push({id: doc.id, ...doc.data()});
            });
            console.log('snap', messages);
            put(fetchMessagesSuccess(messages));

        });
    } catch (error) {
      yield put({ type: chatActionTypes.FETCH_MESSAGES_FAILURE, payload: error });
    }
  }
  
function* sendMessage(action) {
    try {
      const currentUser = yield select(state => state.user.currentUser);
      const message = {
        text: action.payload,
        userName: currentUser.displayName,
        userAva: currentUser.photoURL,
        timestamp: Date.now(),
      };
      const newMessagesRef = doc(collection(dbFirestore, "messages"));
      setDoc(newMessagesRef, message);
    } catch (error) {
      yield put({ type: chatActionTypes.SEND_MESSAGE_FAILURE, payload: error });
    }
  }

  export const chatSagas = [
    takeEvery(chatActionTypes.FETCH_MESSAGES_REQUEST, fetchMessages),
    takeEvery(chatActionTypes.SEND_MESSAGE_REQUEST, sendMessage)
  ];