import { Flex, UnstyledButton } from '@mantine/core'

import { SvgBox } from 'components/CoreEntry/App.styles'
import { useTheme } from 'styled-components'

export default function SendIcon({ typedMessage, sendMessage }: { typedMessage: string; sendMessage: () => void }) {
  const theme: any = useTheme()

  if (typedMessage?.length > 0)
    return (
      // @ts-expect-error
      <UnstyledButton component={Flex} p='20px' h={60} onClick={sendMessage}>
        <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
          <img src='/assets/images/icon-send-plane.svg' />
        </SvgBox>
      </UnstyledButton>
    )
  return (
    <Flex p='20px' h={60}>
      <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
        <img src='/assets/images/icon-assistant.svg' />
      </SvgBox>
    </Flex>
  )
}
