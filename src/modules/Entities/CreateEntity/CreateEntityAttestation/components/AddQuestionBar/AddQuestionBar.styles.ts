import styled from 'styled-components'

export const QuestionBarWrapper = styled.div`
  background: #f7f8f9;
  border: 1px solid #39c3e6;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 1.75rem;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 1.375rem;
  button {
    background: transparent;
    border-radius: 50%;
    border: none !important;
    outline: none !important;
    svg path {
      fill: #7b8285;
      width: 1.25rem;
    }
  }
`
