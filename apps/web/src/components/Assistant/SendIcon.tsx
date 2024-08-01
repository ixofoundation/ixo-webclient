import { Flex, UnstyledButton } from '@mantine/core'

import AssistantIcon from 'assets/images/icon-assistant.svg'
import SendPlaneIcon from 'assets/images/icon-send-plane.svg'
import { SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'

export default function SendIcon({ typedMessage, sendMessage }: { typedMessage: string; sendMessage: () => void }) {
  const theme: any = useTheme()

  if (typedMessage?.length > 0)
    return (
      // @ts-expect-error
      <UnstyledButton component={Flex} p='20px' h={60} onClick={sendMessage}>
        <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
          <SendPlaneIcon />
        </SvgBox>
      </UnstyledButton>
    )
  return (
    <Flex p='20px' h={60}>
      <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
        <AssistantIcon />
      </SvgBox>
    </Flex>
  )
}
