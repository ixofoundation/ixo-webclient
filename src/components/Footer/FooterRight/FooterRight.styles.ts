import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  max-width: unset;
  i:before {
    color: #fff;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    justify-content: flex-end;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
  }
`

export const SocialIcon = styled.a`
  padding: 10px;

  :before {
    color: #fff;
  }

  &:hover:before {
    text-decoration: none;
    color: ${(props: any): string => props.theme.ixoNewBlue};
  }

  &&:hover {
    text-decoration: none;
  }
`

export const SocialIconContainer = styled.div`\
  padding: 10px;
`
