import styled from 'styled-components'

export const AssetExplorerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HeaderSearch = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`

export const HeaderSort = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  transition: all 0.2s;

  & > span {
    color: ${(props): string =>
      props.active ? props.theme.ixoNewBlue : props.theme.color1};
  }

  & > svg > path {
    fill: ${(props): string =>
      props.active ? props.theme.ixoNewBlue : props.theme.color1};
  }

  &:hover {
    & > span {
      color: ${(props): string => props.theme.ixoNewBlue};
    }

    & > svg > path {
      fill: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`
