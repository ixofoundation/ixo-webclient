import styled from 'styled-components'
import { SectionContainer } from '../PageContent/PageContent.styles'

export const Container = styled(SectionContainer)`
  min-height: 350px;
  display: inline-block;
  width: 100%;
  .content {
    float: none;
  }
  img {
    float: left;
    width: 50%;
    margin-right: 15px;
  }
`
