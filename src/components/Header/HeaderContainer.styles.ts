import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const TopBar = styled.header<{ background: string; color: string }>`
  position: sticky;
  top: 0;
  padding: 0 15px;
  z-index: 9;
  background: ${(props): string => props.background};
  color: ${(props) => props.color};
  && {
    width: 100%;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    &.openMenu {
      z-index: 13;
    }
  }
`

export const StatusMessage = styled.div`
  opacity: 0;
  background: ${(props: any): string => props.theme.ixoMediumBlue};
  position: absolute;
  color: white;
  top: 15px;
  right: 0;
  width: 220px;
  padding: 10px;
  line-height: 1.2;
  font-size: 0.8em;
  border-radius: 10px;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 9;

  p {
    margin: 0;
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${(props: any): string => props.theme.ixoMediumBlue};
    position: absolute;
    top: -10px;
    right: 20px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
`

export const Ping = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  &:hover ${StatusMessage}, &:hover ${StatusMessage} {
    opacity: 1;
  }
`

export const Light = styled.span`
  display: block;
  width: 100%;
  height: 4px;
  background: rgb(240, 0, 0);
  border-radius: 0 0 2px 2px;
  box-shadow: 0px 0px 5px 0px rgb(255, 0, 0);
`

export const LightLoading = styled(Light)`
  box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
  background: rgb(255, 165, 0);
  animation: flashing 1s infinite;

  @keyframes flashing {
    0% {
      box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
    }
    50% {
      box-shadow: 0px 0px 5px 1px rgba(255, 200, 0, 1);
      background: rgb(255, 200, 0);
    }
    100% {
      box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
    }
  }
`

export const LightReady = styled(Light)`
  background: #5ab946;
  box-shadow: 0px 0px 5px 0px rgb(0, 255, 64);
`

export const ModalData = styled.div`
  width: 470px;
  text-align: center;
  padding: 20px 20px 30px;

  i {
    font-size: 64px;

    :before {
      color: ${(props: any): string => props.theme.ixoBlue};
    }
  }

  h3 {
    margin-top: 10px;
    font-size: 18px;
    font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  }

  p {
    font-size: 15px;
    font-weight: 300;

    span {
      color: ${(props: any): string => props.theme.ixoBlue};
    }
  }
`

export const InfoLink = styled.a`
  color: white;
  font-size: 12px;
  text-decoration: underline;

  :hover {
    color: ${(props: any): string => props.theme.ixoBlue};
  }
`
