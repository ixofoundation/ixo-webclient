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
  padding: 0.475rem 0.75rem;
  border-radius: 4px !important;
  width: 100%;
  border: none;
  color: ${(props) => props.theme.ixoGrey500};
  &.active {
    padding: 0rem 3rem;
    color: #000;
    &:focus {
      outline: none;
    }
  }
`
export const SelectLabelWrapper = styled.div`
  background: white;
  color: ${(props): string => props.theme.ixoNewBlue};
`
