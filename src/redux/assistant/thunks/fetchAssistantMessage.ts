import { newChat, sendMessage } from 'requests/requesters/assistant'

import type { AsyncAppThunk } from '../../store'
import { setIsModelLoading, setMessageError, setMessages, setIsMessageLoading } from '../assistant.slice'
import { selectAssistantMessages } from '../assistant.selectors'
import { selectAccountState } from 'redux/account/account.selectors'

export function fetchAssistantMessage(message: string): AsyncAppThunk {
  return async (dispatch) => {
    try {
      dispatch(setIsMessageLoading({ isLoading: true }))

      const newMessages = (await sendMessage(message)) || []

      dispatch(setMessages({ messages: newMessages }))
    } catch (error) {
      dispatch(setMessageError({ error: error as Error }))
    } finally {
      dispatch(setIsMessageLoading({ isLoading: false }))
    }
  }
}

export function fetchAssistantNewChat(): AsyncAppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsModelLoading({ isLoading: true }))

      const user = selectAccountState(getState())

      if (!user) throw new Error('User not found')

      const newMessages = (await newChat(user.address!, user.did!, '')) || []
      dispatch(setMessages({ messages: newMessages }))
    } catch (error) {
      dispatch(setMessageError({ error: error as Error }))
    } finally {
      dispatch(setIsModelLoading({ isLoading: false }))
    }
  }
}

export default function fetchInstantAssistantMessage(message: string): AsyncAppThunk {
  return async (dispatch, getState) => {
    const messages = selectAssistantMessages(getState())
    if (!messages.length) {
      await dispatch(fetchAssistantNewChat())
    }
    dispatch(fetchAssistantMessage(message))
  }
}
