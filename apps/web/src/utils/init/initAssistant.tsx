import { useEffect } from 'react'
import { useAccount } from 'hooks/account'
import { useAppDispatch } from 'redux/hooks'
import fetchInstantAssistantMessage from 'redux/assistant/thunks/fetchAssistantMessage'

export const InitAssistant = () => {
  const { address } = useAccount()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (address) {
      dispatch(fetchInstantAssistantMessage('What can you do?'))
    }
  }, [address, dispatch])

  return null
}
