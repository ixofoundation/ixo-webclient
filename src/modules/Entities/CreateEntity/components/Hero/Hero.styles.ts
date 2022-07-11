import styled from 'styled-components'
import { deviceWidth } from '../../../../../lib/commonData'

export const HeroContainer = styled.div`
  background: #f7f8f9;
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
    font-size: 45px;
    line-height: 1;
    color: black;
    margin: 0;
    letter-spacing: 0.3px;
  }
`
