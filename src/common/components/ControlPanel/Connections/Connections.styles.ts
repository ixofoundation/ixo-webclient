import styled from "styled-components";
import { SquareButtonSection } from "../ControlPanel.styles";
import { QRInner } from "../../QRCode/QRCode.styles";

export const ConnectionButtonsWrapper = styled(SquareButtonSection)`
  button {
    margin-bottom: 1rem;
    max-width: 5.5rem;
    .icon-wrapper {
      border-radius: 50%;
      padding: 1.25rem;
      svg {
        margin: 0 auto;
        width: 1.875rem;
        path {
          fill: ${(props: any): string => props.theme.ixoBlue};
        }
      }
    }
  }
  .show-more-container {
    background: #fff;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0s ease-out;
    &.show {
      transition: max-height 1.75s ease-out;
      max-height: 300px;
    }
    > * {
      padding: 1rem;
    }
    button {
      margin: 0;
    }
    ${QRInner} {
      background: none;
      box-shadow: none;
      margin: 0;
      padding: 0;
      height: initial;
    }
  }
`;
