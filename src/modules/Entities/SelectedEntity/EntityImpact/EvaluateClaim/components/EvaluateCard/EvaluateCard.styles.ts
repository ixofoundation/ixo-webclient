import styled from 'styled-components'

export const Container = styled.div`
  background: white;
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
`

export const ActionButtonContainer = styled.div`
  border: 0.5px solid #75B4D2;
  border-radius: 4px;
  width: fit-content;
  display: flex;
  margin-left: auto;

  button {
    outline: none !important;
    border: none;
    border-right: 0.5px solid #75B4D2;
    background: transparent;
    font-size: 0.75rem;
    color: #7C8E97;
    width: 90px;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 0.5rem;
    }

    &:nth-of-type(2) {
      svg {
        margin-left: 0rem;
      }
    }

    &:last-of-type {
      border-right: none;
      width: 33px;
      padding: 0.25rem;
      svg {
        margin-left: 0;
      }
    }
  }
`