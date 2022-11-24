import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const HeroContainer = styled.div`
  color: #7b8285;
  font-family: ${(props: any): string => props.theme.primaryFontFamily};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  @media (min-width: ${deviceWidth.tablet}px) {
    min-height: 200px;
  }

  h1 {
    font-family: ${(props: any): string => props.theme.secondaryFontFamily};
    font-size: 2.8125rem;
    line-height: 1;
    color: black;
    margin: 0;
    letter-spacing: 0.3px;
  }

  h6 {
    font-family: ${(props: any): string => props.theme.primaryFontFamily};
    font-size: 14px;
    line-height: 2.5;
    color: #7b8285;
    margin: 0;
  }

  p {
    font-size: 0.875rem;
    line-height: 2;
    color: #7b8285;
    margin: 0;
  }
`
