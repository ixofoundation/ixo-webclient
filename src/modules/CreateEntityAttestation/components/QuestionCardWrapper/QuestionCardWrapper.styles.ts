import styled from 'styled-components'

export const Toolbar = styled.div`
  border-top: 1px solid #e8edee;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  .toolbar-item {
    cursor: pointer;
    margin: 1.25rem 0.75rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .divider {
    height: 1.875rem;
    width: 1px;
    margin: 0 1.125rem;
    background: #e8edee;
  }
`
