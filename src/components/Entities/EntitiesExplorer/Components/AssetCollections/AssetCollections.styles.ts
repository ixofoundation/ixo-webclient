import styled from 'styled-components'

export const AssetCollectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const AssetCollectionsSortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`

export const AssetCollectionsSort = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  & > span {
    color: ${(props): string =>
      props.isActive ? props.theme.ixoNewBlue : props.theme.color1};
  }
  & > svg > path {
    fill: ${(props): string =>
      props.isActive ? props.theme.ixoNewBlue : props.theme.color1};
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

export const AssetCollectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 40px;

  & > div {
    flex-basis: calc(33% - 25px);
    width: 100%;
    height: 250px;
  }
`
