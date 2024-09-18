import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChatMessage } from '@ixo/assistant-sdk/types/types/assistant'

import { IAssistantState } from './assistant.types'

const initialAssistantState: IAssistantState = {
  messages: [],

  isMessageLoading: false,
  isConnectionLoading: false,
  messageError: undefined,
  connectionError: undefined,
  togglePanel: false,
}

const AssistantSlice = createSlice({
  name: 'AssistantSlice',
  initialState: initialAssistantState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ messages: ChatMessage[] }>) => {
      const { messages } = action.payload
      state.messages = messages
    },

    setMessageError: (state, action: PayloadAction<{ error: Error }>) => {
      const { error } = action.payload
      state.messageError = error
    },
    setIsMessageLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      const { isLoading } = action.payload
      state.isMessageLoading = isLoading
    },

    setIsModelLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      const { isLoading } = action.payload
      state.isConnectionLoading = isLoading
    },

    setConnectionError: (state, action: PayloadAction<{ error: Error }>) => {
      const { error } = action.payload
      state.connectionError = error
    },

    resetMessages: (state) => {
      state.messages = []
      state.isMessageLoading = false
      state.isConnectionLoading = false
      state.messageError = undefined
      state.connectionError = undefined
    },

    togglePanel: (state) => {
      state.togglePanel = !state.togglePanel
    },
  },
})

export const {
  setMessages,

  setMessageError,
  setIsMessageLoading,

  setIsModelLoading,
  setConnectionError,

  resetMessages,

  togglePanel,
} = AssistantSlice.actions

export default AssistantSlice.reducer
