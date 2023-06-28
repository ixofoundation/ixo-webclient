import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  font-family: ${(props): string => props.theme.secondaryFontFamily};

  .ce-block,
  .ce-toolbar {
    &__content {
      max-width: 100%;
      margin: 0;
    }
  }

  .cdx-button,
  .ce-header[contentEditable='true'][data-placeholder]::before {
    color: ${(props) => props.theme.ixoGrey700};
  }

  .cdx-button {
    border: none;
    box-shadow: none;
    padding: 0;
  }
`

export const Row = styled.div`
  display: flex;
`
