import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'
import { SectionContainer } from '../PageContent/PageContent.styles'

export const Container = styled(SectionContainer)`
  min-height: 350px;
  display: inline-block;
  width: 100%;
  p {
    float: none;
  }
  img {
    float: left;
    width: 50%;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    img {
      width: 50%;
      margin-right: 1rem;
    }
  }
`
