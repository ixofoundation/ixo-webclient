import Image from 'next/image'
import React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { IconSendPlane } from 'components/IconPaths'


type Props = ButtonProps & {
  onClick: () => void
}

const SuggestionButton: React.FC<Props> = ({ onClick, ...props }) => {
  const theme = useMantineTheme()

  return (
    <Button
      styles={{
        root: {
          borderColor: theme.colors.blue[5],
          color: theme.colors.blue[5],
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
          <Image src={IconSendPlane} alt='SendPlane' width={5} height={5} color={theme.colors.blue[5]} />
        </SvgBox>
      }
      onClick={onClick}
      style={{ background: theme.colors.blue[5], color: theme.white }}
    >
      {props.children}
    </Button>
  )
}

export default SuggestionButton
