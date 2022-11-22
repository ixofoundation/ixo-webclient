import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

export const Row = styled.div`
  display: flex;
`

export const Badge = styled.div<{ active: boolean }>`
  border-radius: 9999px;
  padding: 5px 10px;
  background: ${(props): string =>
    props.active ? props.theme.ixoNewBlue : props.theme.ixoColor1};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`
