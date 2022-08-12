import styled from 'styled-components'

export const PairListWrapper = styled.div`
  position: relative;
`

export const PairListSearchInput = styled.input`
  color: #ffffff;
  font-size: 24px;
  line-height: 41px;
  font-weight: 400;

  width: 100%;
  background: none;
  border: none;
  border-bottom: 3px solid ${(props): string => props.theme.fontBlueDisabled};
  margin-top: 20px;

  &::placeholder {
    color: ${(props): string => props.theme.fontBlueDisabled};
  }

  &:focus {
    outline: none;
  }
`

export const PairListTokens = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
  padding: 0;
  height: 270px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: ${(props): string => props.theme.fontBlueDisabled};
  }
`

export const PairListTokenWrapper = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;

  & span.name {
    font-weight: 400;
    font-size: 24px;
    line-height: 41px;
    text-transform: uppercase;
  }

  & span.balance {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`
