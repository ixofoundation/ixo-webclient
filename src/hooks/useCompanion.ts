import { useWallet } from 'wallet-connector'
import Assistant from '@ixo/assistant-sdk'
import { chainNetwork } from './configs'
import { ChatMessage } from '@ixo/assistant-sdk/types/types/assistant'
import React, { useCallback, useEffect } from 'react'
import { Observer } from '@ixo/assistant-sdk/types/types/observer'
import { cosmos, createRegistry } from '@ixo/impactxclient-sdk'
import { fee } from 'lib/protocol'
import { useCompanionContext } from 'contexts/CompanionContext'

const ASSISTANT_API_KEY = process.env.NEXT_PUBLIC_ASSISTANT_API_KEY

export const decodeTransactionBody = (txBody: Uint8Array) => {
  const registry = createRegistry()
  const decodedTxBody = cosmos.tx.v1beta1.TxBody.decode(txBody)
  const messages = decodedTxBody.messages.map((message) => {
    const typeUrl = message.typeUrl
    const msg = registry.decode(message)
    return { typeUrl, value: msg }
  })
  return { ...decodedTxBody, messages }
}

export const useCompanion = () => {
  const { wallet, executeTxBody, execute, close } = useWallet()
  const [assistant, setAssistant] = React.useState<Assistant | null>(null)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const {
    isCompanionOpen,
    isChatOpen,
    openChat,
    openCompanion,
    closeChat,
    closeCompanion,
    toggleChat,
    toggleCompanion,
  } = useCompanionContext()

  useEffect(() => {
    if (ASSISTANT_API_KEY && wallet?.address && wallet?.did && chainNetwork && !assistant) {
      const assistant = new Assistant({
        apiKey: ASSISTANT_API_KEY ?? '',
        address: wallet?.address ?? '',
        did: wallet?.did ?? '',
        network: chainNetwork,
        // Optional: assistantUrl
      })
      console.log('Assistant initialized:', assistant)
      setAssistant(assistant)
    } else {
      console.warn('Assistant could not be initialized:', { ASSISTANT_API_KEY, wallet, chainNetwork })
    }
  }, [wallet, assistant, setAssistant])

  useEffect(() => {
    if (!assistant) return
    const observer: Observer = {
      update: (updatedMessages: ChatMessage[]) => setMessages([...updatedMessages]),
    }
    // Subscribe to the observable
    assistant.subscribe(observer)
    // Unsubscribe from the observable when the component unmounts
    assistant.onTransaction(async (txBody) => {
      const body = decodeTransactionBody(txBody)
      // Handle the transaction
      // console.log({ txBody: registry.decodeTxBody(txBody) })
      const response = await execute({
        data: { fee, messages: body.messages, memo: body.memo },
        transactionConfig: { sequence: 1 },
      })
      close()
      return response as any
    })

    return () => {
      assistant?.unsubscribe(observer)
    }
  }, [executeTxBody, close, execute, assistant])

  const sendMessage = useCallback(
    async (message: string) => {
      if (!assistant) {
        console.error('Assistant not connected.')
        throw new Error('Assistant not connected.')
      }
      try {
        const newMessages = await assistant.chat(false, message)
        setMessages([...newMessages])
      } catch (error: any) {
        console.error('Error sending message:', error)
      }
    },
    [assistant],
  )

  const newChat = useCallback(async () => {
    if (!assistant) {
      console.error('Assistant not connected. Try cleaning the chat and try again.')
      throw new Error('Assistant not connected. Try cleaning the chat and try again.')
    }
    try {
      const newMessages = await assistant.newChat(false)
      setMessages([...newMessages])
    } catch (error) {
      console.error('Error starting new chat:', error)
    }
  }, [assistant])

  return {
    messages,
    sendMessage,
    newChat,
    assistant,
    isChatOpen,
    isCompanionOpen,
    openChat,
    openCompanion,
    closeChat,
    closeCompanion,
    toggleChat,
    toggleCompanion,
  }
}
