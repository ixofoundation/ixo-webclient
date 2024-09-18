import styled from 'styled-components'

export const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  border-radius: 5px;

  button {
    color: #373d3f;
    min-width: 85px;
    height: 42px;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border: 1.5px solid ${(props) => props.theme.ixoNewBlue};
    background: transparent;

    &:first-child {
      border-radius: 5px 0px 0px 5px;
    }

    &:nth-child(2) {
      border-radius: 0px 5px 5px 0px;
      border-left: none;
    }
  }
`

export const SectionTitle = styled.div`
  font-weight: normal;
  font-size: 22px;
`
