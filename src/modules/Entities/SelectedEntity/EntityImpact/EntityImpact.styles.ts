import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const DetailContainer = styled.div`
  background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.gradientBlue};
  display: block;
  flex: 1 1 auto;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`
