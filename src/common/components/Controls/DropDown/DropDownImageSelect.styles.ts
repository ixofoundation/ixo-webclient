import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  img {
    width: 1.75rem;
    position: absolute;
    left: 10px;
    border: 1px solid transparent;
    &.country {
      top: 50%;
      transform: translateY(-70%);
      border-radius: 4px;
    }
    &.sdg {
      top: calc(50% - 1.325rem);
      border-radius: 10px;
    }
  }
`
