import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  letter-spacing: 0.3px;
`

export const PageRow = styled.div`
  display: flex;
`

export const PropertyBox = styled.div<{ second?: boolean }>`
  border-radius: 8px;
  width: 110px;
  height: 110px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background: ${(props): string =>
    props.second ? props.theme.ixoLightGrey2 : props.theme.ixoMediumGrey};
  transition: all 0.2s;
  cursor: pointer;

  & > svg {
    width: 42px;
    height: 42px;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`
