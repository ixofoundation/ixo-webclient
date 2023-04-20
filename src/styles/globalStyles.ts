import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
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

  // Cosmodal styles
  .cosmodal-content {
    background: linear-gradient(180deg, #01273A 0%, #002D42 100%) !important;
    color: #ffffff !important;
    max-width: 30rem !important;
    padding: 1.25rem 2rem !important;
    font-family: Roboto Condensed, sans-serif;

    .cosmodal-header {
      color: currentColor !important;
    }
    .cosmodal-wallet {
      box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25) !important;
      background: linear-gradient(180deg, #01273a 0%, #002d42 100%) !important;
      
      .cosmodal-wallet-name, .cosmodal-wallet-description {
        color: currentColor !important;
      }
    }
  }
`
