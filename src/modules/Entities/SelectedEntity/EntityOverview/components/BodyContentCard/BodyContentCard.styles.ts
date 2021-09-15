import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'
import { SectionContainer } from '../PageContent/PageContent.styles'

export const Container = styled(SectionContainer)`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  img,
  p {
    flex: 1 1 auto;
    width: 100%;
  }
  img {
    height: intrinsic;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    img {
      width: 50%;
      margin-bottom: 0;
    }
    p.content {
      width: calc(50% - 1.35rem);
      margin-left: 1.25rem;
    }
  }
`
