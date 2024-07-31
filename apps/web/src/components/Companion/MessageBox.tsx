import { ActionIcon, Flex, Textarea } from '@mantine/core'
import { useState } from 'react'
import { LiaArrowRightSolid, LiaBroomSolid, LiaHeadphonesAltSolid, LiaUndoAltSolid } from 'react-icons/lia'

export const MessageBox = ({ sendMessage }: { sendMessage: (message: string) => Promise<void> }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (message: string) => {
    setLoading(true)
    await sendMessage(message)
    setMessage('')
    setLoading(false)
  }

  return (
    <Flex h='18%' justify='center' gap={40} w='100%' bg='#EBEBEB' p={20}>
      <Flex mt={'auto'} gap={20} align={'center'}>
        <LiaUndoAltSolid size={26} color='#20798C' />
        <LiaBroomSolid size={26} color='#20798C' />

        <Textarea
          value={message}
          disabled={loading}
          radius='md'
          w='800px'
          autosize
          minRows={1}
          maxRows={3}
          size='xl'
          placeholder='Ask or Search'
          rightSectionWidth={42}
          onChange={(event) => setMessage(event.currentTarget.value)}
          onKeyUp={(event) => event.key === 'Enter' && handleSubmit(message)}
          rightSection={
            <ActionIcon
              disabled={loading}
              size={32}
              me={8}
              radius='xl'
              bg='white'
              onClick={() => message.length > 0 && handleSubmit(message)}
            >
              <LiaArrowRightSolid size={24} color='#20798C' />
            </ActionIcon>
          }
          styles={{ input: { borderColor: '#20798C' } }}
        />
        <LiaHeadphonesAltSolid size={26} color='#20798C' />
      </Flex>
    </Flex>
  )
}
