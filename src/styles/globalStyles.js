import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  body.noScroll {
    overflow: hidden;
  }

  .shadow-box,
  .chat-container .shadow-box {
    box-shadow: none !important;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .overflow-auto {
    overflow: auto;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  // Borders
  .ixo-rounded-lg	 {
    border-radius: 0.5rem; /* 8px */
  }
  .ixo-border {
    border-width: 1px;
  }
  .ixo-border-solid	 {
    border-style: solid;
  }
  .ixo-border-current {
    border-color: currentColor;
  }
`
