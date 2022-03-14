import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  img {
    width: 1.75rem;
    position: absolute;
    border: 1px solid transparent;
    border-radius: 4px;
  }
`
export const SelectContainer = styled.select`
  background: #e8edee;
  padding: 0.313rem 2.188rem 0.313rem 0.313rem;
  border: none;
  color: gray;
  &.active {
    padding: 0rem 3rem;
    color: #000;
    &:focus {
      outline: none;
    }
  }
`
