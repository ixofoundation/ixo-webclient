import styled from 'styled-components'

export const RecipientWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  column-gap: 0.5rem;
  margin-top: 0.5rem;
  & > div:first-child {
    width: 100%;
  }
  & > button {
    background: #03324a;
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
    box-sizing: border-box;
    box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    color: #537b8e;
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: 500;
    font-size: 15px;
    line-height: 10px;
    transition: all 0.2s;  
    &:focus {
      outline: unset !important;
    }
    &:hover {
      color: #ffeeee !important;
    }    
  }
  }
`
