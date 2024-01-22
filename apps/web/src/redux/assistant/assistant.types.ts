import { ChatMessage } from '@ixo/assistant-sdk/types/types/assistant'

export type IAssistantState = {
  messages: ChatMessage[]

  messageError: Error | undefined
  isMessageLoading: boolean

  isConnectionLoading: boolean
  connectionError: Error | undefined

  togglePanel: boolean
}
