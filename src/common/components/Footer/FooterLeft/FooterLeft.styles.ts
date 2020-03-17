import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ExternalFooterLink = styled.a`
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoRegular};
  color: white;
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid #000000;
  border-radius: 3px;
  margin: 0 10px;

  :hover {
    text-decoration: none;
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
  }

  transition: border 0.3s ease;

  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 10px 20px 10px;
    margin: 0 10px;
    font-size: 15px;
  }

  transition: border 0.3s ease;
`

export const IXOLogo = styled.img`
  margin-right: 20px;
  height: 40px;
  margin-top: 2px;
`

export const FooterTextBlue = styled.span`
  color: #5cd0fa;

  :hover {
    text-decoration: underline;
  }
`

export const FooterText = styled.div`
  padding: 19px 0px 20px 15px;
  color: #808080;
  font-family: Roboto;
  font-size: 14px;
  line-height: 19px;

  a {
    font-weight: 400;
  }
  p {
    font-size: 13px;
    color: #808080;
    display: block;
    font-weight: 400;
  }
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ByLine = styled.div`
  a {
    color: #808080;
  }

  a:hover {
    color: white;
  }

  a:before {
    content: '|';
    margin: 0 15px;
    color: #808080;
  }
`
