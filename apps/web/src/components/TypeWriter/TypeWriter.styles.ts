import styled from 'styled-components'

export const TypeWriterText = styled.span`
  display: inline;
  margin-left: 0.3rem;
  color: #83d9f2;
  font-weight: 300;
`
export const TypeWriterCursor = styled.span`
  display: inline-block;
  color: #f7f7f7;
  animation: blink 1s ease-in-out 0s infinite alternate;

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
