import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const DetailContainer = styled.div`
  background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.blue};
  display: block;
  flex: 1 1 auto;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`

export const Loading = styled.div`
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${/* eslint-disable-line */ (props) => props.theme.bg.blue};
  padding: 50px 20px;
`
export const ContentContainer = styled.div`
  flex-grow: 1;
  background: ${(props) => props.theme.bg.blue}

  @media (max-width: ${deviceWidth.mobile}px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`