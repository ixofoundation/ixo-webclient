import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  i:before {
    color: #fff;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
  }
`

export const SocialIcon = styled.a`
  padding: 10px;
  svg path {
    fill: #fff;
  }
  &:hover {
    svg path {
      fill: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    }
  }
`

export const SocialIconContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;

  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0;
    padding-right: 60px;
  }
`
