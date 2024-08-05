import { Flex, UnstyledButton } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { IconSendPlane, IconAssistant } from 'components/IconPaths'
import Image from 'next/image'

export default function SendIcon({ typedMessage, sendMessage }: { typedMessage: string; sendMessage: () => void }) {
  const theme = useMantineTheme()

  if (typedMessage?.length > 0)
    return (
      // @ts-expect-error
      <UnstyledButton component={Flex} p='20px' h={60} onClick={sendMessage}>
        <Image src={IconSendPlane} alt='Send' width={5} height={5} color={theme.colors.blue[5]} />
      </UnstyledButton>
    )
  return (
    <Flex p='20px' h={60}>
      <Image src={IconAssistant} alt='Send' width={5} height={5} color={theme.colors.blue[5]} />
    </Flex>
  )
}
