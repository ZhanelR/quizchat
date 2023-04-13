//import * as types from './ActionTypesChat'

import { chatActionTypes } from "../chats/ActionTypesChat";

export function fetchMessages() {
  return { type: chatActionTypes.FETCH_MESSAGES_REQUEST };
}

export function sendMessage(text) {
  return { type: chatActionTypes.SEND_MESSAGE_REQUEST, payload: text };
}

/* 
// другой способ
let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	message,
	author
})

export const addUser = name => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name
})

export const messageReceived = (message, author) => ({
	type : types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
}) */