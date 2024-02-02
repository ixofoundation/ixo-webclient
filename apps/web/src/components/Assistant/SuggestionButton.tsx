import { Button, ButtonProps } from '@mantine/core'
import { useTheme } from 'styled-components'
import { ReactComponent as SendPlaneIcon } from 'assets/images/icon-send-plane.svg'
import { SvgBox } from 'components/App/App.styles'

export default function SuggestionButton({ onClick, ...props }: ButtonProps & { onClick: () => void }) {
  const theme: any = useTheme()

  return (
    <Button
      style={{
        inner: {
          justifyContent: 'space-between',
          '>span:last-child': { display: 'none' },
          ':hover': {
            '>span:last-child': { display: 'flex' },
          },
        },
        root: {
          borderColor: theme.ixoNewBlue,
          color: theme.ixoNewBlue,
          backgroundColor: theme.ixoWhite,
          ':hover': {
            backgroundColor: theme.ixoLightBlue,
          },
        },
      }}
      py='3.5px'
      pl='20px'
      lh='20px'
      h='28px'
      fw={300}
      radius='0'
      variant='outline'
      fullWidth
      rightSection={
        <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
          <SendPlaneIcon />
        </SvgBox>
      }
      onMouseDown={onClick}
      {...props}
    />
  )
}
