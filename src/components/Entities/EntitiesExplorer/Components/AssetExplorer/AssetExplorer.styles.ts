import styled from 'styled-components'

export const AssetExplorerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;

  border-bottom: 1px solid #e7e7e7;
`

export const HeaderRow = styled.div`
  padding: 9px;
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
    color: ${(props): string => (props.active ? props.theme.ixoNewBlue : props.theme.ixoDarkBlue)};
  }

  & > svg > path {
    fill: ${(props): string => (props.active ? props.theme.ixoNewBlue : props.theme.ixoDarkBlue)};
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

export const Body = styled.div``
