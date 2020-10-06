import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items; center;

  a {
    width: fit-content;
    color: #39C3E6 !important;
    border-radius: 4px !important;
    font-size: .75rem !important;
    padding: 0.125rem 0.625rem !important;
    text-transform: none;
    margin-right: 0.625rem;
    background: #143F54;
  }

  a.disabled {
    border-color: transparent;
    cursor: pointer;
    opacity: 0.5;
  }

  a.disabled:hover {
    border: 1px solid #49BFE0;
    opacity: 0.8;
  }
`;