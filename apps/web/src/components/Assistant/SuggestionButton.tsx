import React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useTheme } from 'styled-components'

import { SvgBox } from 'components/CoreEntry/App.styles'

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
          <img src='/assets/images/icon-send-plane.svg' />
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
