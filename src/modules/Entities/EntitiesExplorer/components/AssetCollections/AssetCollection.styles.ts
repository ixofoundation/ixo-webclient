import { Typography } from 'modules/App/App.styles'
import styled from 'styled-components'

export const AssetCollectionWrapper = styled.div`
  position: relative;
  cursor: pointer;
`

export const AssetCollectionBackground = styled.img`
  position: absolute;
  border-radius: 8px;
  z-index: 0;
  width: 100%;
  height: 100%;

  //  mix-blend-mode: normal;
  //  border: 2px solid #00d2ff;
  //  filter: drop-shadow(0px 0px 20px rgba(0, 210, 255, 0.5));
`

export const AssetCollectionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );

  transition: all 0.2s;

  & span {
    color: white;
  }

  &:hover {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    & > #sdg {
      display: none;
    }
    & > #total-supply,
    & > #description {
      display: -webkit-box;
    }
  }
`

export const AssetCollectionSdgs = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`

export const AssetCollectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AssetCollectionHeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

export const AssetCollectionHeaderLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

export const AssetCollectionTotalSupply = styled(Typography)`
  display: none;
`

export const AssetCollectionDescription = styled(Typography)`
  display: none;
  max-width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
