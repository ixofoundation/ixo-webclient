import styled from 'styled-components'

export const FileContainer = styled.div`
  & img {
    max-width: 200px;
    max-height: 80px;
    margin: 10px 0 0;
    padding-bottom: 15px;
  }

  & .custom-file-label {
    border-radius: 0;
  }

  & .custom-file-label::after {
    background: ${/* eslint-disable-line*/ props => props.theme.bgMain};
    border-radius: 0;
    color: white;
    text-transform: uppercase;
    border: 0;
    font-size: 0.7em;
    height: 38px;
    top: -1px;
    right: -1px;
    display: flex;
    align-items: center;
  }
`
