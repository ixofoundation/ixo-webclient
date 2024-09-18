import { ReactNode } from 'react'
import styled from 'styled-components'

const ExpandContainer = styled.div`
  width: 100%;
  flex-flow: row wrap;
  max-height: 0;
  display: flex;
  overflow: hidden;
  transition: max-height 0s ease-out;
  opacity: 0;
  &.show {
    overflow: initial;
    transition: max-height 1.75s ease-out, opacity 0.5s;
    opacity: 1;
    max-height: 300px;
  }
`

interface Props {
  expanded: boolean
  children?: ReactNode
}

const Expand = ({ expanded = false, children }: Props) => {
  return <ExpandContainer className={`${expanded ? 'show' : ''}`}>{children}</ExpandContainer>
}

export default Expand
