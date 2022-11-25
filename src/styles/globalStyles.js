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
`
