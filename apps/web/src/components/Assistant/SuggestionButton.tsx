import React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useTheme } from 'styled-components'
import { ReactComponent as SendPlaneIcon } from 'assets/images/icon-send-plane.svg'
import { SvgBox } from 'components/App/App.styles'

type Props = ButtonProps & {
  onClick: () => void
}

const SuggestionButton: React.FC<Props> = ({ onClick, ...props }) => {
  const theme: any = useTheme()

  return (
    <Button
      styles={{
        root: {
          borderColor: theme.ixoNewBlue,
          color: theme.ixoNewBlue,
          ':hover': {
            backgroundColor: theme.ixoLightBlue,
          },
        },
      }}
      justify='space-between'
      size='md'
      w='100%'
      radius={8}
      rightSection={
        <SvgBox $svgWidth={5} $svgHeight={5}>
          <SendPlaneIcon />
        </SvgBox>
      }
      onClick={onClick}
      style={{ background: theme.ixoNewBlue, color: theme.white }}
    >
      {props.children}
    </Button>
  )
}

export default SuggestionButton
