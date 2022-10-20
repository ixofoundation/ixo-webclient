import styled from 'styled-components'

export const AssetExplorerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
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

export const HR = styled.hr`
  background: #e7e7e7;
  margin-bottom: 16px;
  width: 100%;
`

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 30px;

  & > div {
    flex-basis: calc(25% - 23px);
  }
`
