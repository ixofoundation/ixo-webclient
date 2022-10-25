import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 50px;
`

export const Selections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
`

export const OptionRadio = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  background: ${(props): string => props.theme.neutralLightGrey};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    ${(props): string => !props.checked && 'display: none;'}
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${(props): string => props.theme.ixoNewBlue};
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
`

export const OptionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`
