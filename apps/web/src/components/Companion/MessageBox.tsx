import { ActionIcon, Box, Flex, TextInput } from '@mantine/core'
import { useCompanion } from 'hooks/useCompanion'
import { useState } from 'react'
import { LiaArrowRightSolid, LiaBroomSolid, LiaHeadphonesAltSolid, LiaUndoAltSolid } from 'react-icons/lia'

export const MessageBox = () => {
  const { sendMessage } = useCompanion()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (message: string) => {
    setLoading(true)
    await sendMessage(message)
    setMessage('')
    setLoading(false)
  }

  return (
    <Flex h='18%' justify='center' gap={40} w='100%' bg='#EBEBEB' pt={20}>
      <Box mt={15}>
        <LiaUndoAltSolid size={26} color='#20798C' />
      </Box>
      <TextInput
        value={message}
        disabled={loading}
        radius='md'
        w='800px'
        size='xl'
        placeholder='Talk to your Assistant'
        rightSectionWidth={42}
        onChange={(event) => setMessage(event.currentTarget.value)}
        onKeyUp={(event) => event.key === 'Enter' && handleSubmit(message)}
        rightSection={
          <ActionIcon
            disabled={loading}
            size={32}
            radius='xl'
            bg='white'
            onClick={() => message.length > 0 && handleSubmit(message)}
          >
            <LiaArrowRightSolid size={24} color='#20798C' />
          </ActionIcon>
        }
        styles={{ input: { borderColor: '#20798C' } }}
      />
      <Flex gap={20} mt={15}>
        <LiaBroomSolid size={26} color='#20798C' />
        <LiaHeadphonesAltSolid size={26} color='#20798C' />
      </Flex>
    </Flex>
  )
}
