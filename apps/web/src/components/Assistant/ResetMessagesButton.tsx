import { ReactComponent as BroomIcon } from 'assets/images/icon-broom.svg'
import { SvgBox } from 'components/App/App.styles'

import { resetMessages } from 'redux/assistant/assistant.slice'
import { useAppDispatch } from 'redux/hooks'
import { useTheme } from 'styled-components'

export default function ResetMessagesButton() {
  const dispatch = useAppDispatch()
  const theme: any = useTheme()

  const handleClick = () => {
    dispatch(resetMessages())
  }

  return (
    <SvgBox
      $svgWidth={7}
      $svgHeight={7}
      style={{
        position: 'absolute',
        top: '-40px',
        left: '4px',
        padding: '4px',
        borderRadius: '50%',
        backgroundColor: theme.ixoGrey100,
      }}
      color={theme.ixoNewBlue}
      onClick={() => handleClick()}
      cursor='pointer'
    >
      <BroomIcon />
    </SvgBox>
  )
}
