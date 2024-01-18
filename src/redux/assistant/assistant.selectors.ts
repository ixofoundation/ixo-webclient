import { ChatMessage } from '@ixo/assistant-sdk/types/types/assistant'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

import { IAssistantState } from './assistant.types'

export const selectRoot = (state: RootState) => state

export const selectAssistantState = createDraftSafeSelector(
  selectRoot,
  (state: RootState): IAssistantState => state?.assistant,
)

export const selectAssistantMessages = createDraftSafeSelector(
  selectAssistantState,
  (state: IAssistantState): ChatMessage[] => state?.messages,
)

export const selectAssistantIsThinking = createDraftSafeSelector(
  selectAssistantState,
  (state: IAssistantState): boolean => !!(state?.isMessageLoading || state.isConnectionLoading),
)

export const selectIsUserSentMessages = createDraftSafeSelector(
  selectAssistantState,
  (state: IAssistantState): boolean =>
    state?.messages.find((message) => message.role === 'user' && message.content) !== undefined,
)

export const selectAssistantError = createDraftSafeSelector(
  selectAssistantState,
  (state: IAssistantState): Error | undefined => state?.messageError || state.connectionError,
)

export const selectAssistantToggle = createDraftSafeSelector(
  selectAssistantState,
  (state: IAssistantState): boolean => state?.togglePanel,
)
