import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ContainerInner = styled.div`
  height: auto;
  width: 100%;
  transition: border-left 0.3s ease;

  > div {
    transition: transform 0.3s ease;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    padding-top: 16%;
  }
`

export const StatisticContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0;
  justify-content: center;

  @media (min-width: ${deviceWidth.tablet}px) {
    ${ContainerInner} {
      border-left: 1px solid rgba(73, 191, 224, 0.3);
    }
  }

  :first-child > div {
    border-left: 0;
  }
`

export const HeroInner = styled.div`
  height: 100%;

  > .row {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  :hover ${ContainerInner} {
    border-left: 1px solid rgba(73, 191, 224, 0);
  }

  :hover ${ContainerInner} > div {
    transform: scale(1.05);
  }
`

export const HeroContainer = styled.div`
  background: url(${require('../../../../assets/images/ixo-heroBg.jpg')})
    no-repeat center top;
  background-size: cover;
  margin: 0 0 0px;
  cursor: default;
  position: relative;

  ${HeroInner}:before {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: background 0.3s ease;

    background-color: rgba(3, 60, 80, 0);
  }

  ${HeroInner}:hover:before {
    background-color: rgba(3, 60, 80, 0.6);
    cursor: normal;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 200px;
  }
`
