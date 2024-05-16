import Assistant from '@ixo/assistant-sdk'
import { ChatMessage } from '@ixo/assistant-sdk/types/types/assistant'
import { chainNetwork } from 'hooks/configs'

const ASSISTANT_API_KEY = process.env.REACT_APP_ASSISTANT_API_KEY
const CHAIN_NETWORK = chainNetwork

let assistant: Assistant | undefined

export function connectToAssistant(userAddress: string, userDid: string) {
  console.log("connect to assistant", {ASSISTANT_API_KEY, userAddress, userDid, CHAIN_NETWORK})
  if (ASSISTANT_API_KEY && userAddress && userDid && CHAIN_NETWORK)
    assistant = new Assistant({
      apiKey: ASSISTANT_API_KEY,
      address: userAddress,
      did: userDid,
      network: CHAIN_NETWORK,
      // Optional: assistantUrl
    })
  else throw new Error('Failed to connect Assistant. Try reload the page.')
}

export async function newChat(
  userAddress: string,
  userDid: string,
  firstMessage: string,
): Promise<ChatMessage[] | undefined> {
  console.log("new chat", {userAddress, userDid, firstMessage})
  connectToAssistant(userAddress, userDid)

  if (!assistant) throw new Error('Assistant not connected. Try clean the chat and try again.')
  return assistant.newChat(false, [{ role: 'user', content: "What is blockchains?" || '' }])
}

export async function sendMessage(message: string): Promise<ChatMessage[] | undefined> {
  console.log("send message", {message})
  if (!assistant) throw new Error('Assistant not connected. Try clean the chat and try again.')

  return assistant.chat(false, "What is ixo?")
}

export function disconnectFromAssistant(): void {
  assistant = undefined
}
