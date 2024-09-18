import styled from 'styled-components'
import { requireCheckDefault } from 'utils/images'

export const AssetCardWrapper = styled.div<{ active?: boolean }>`
  filter: ${(props): string =>
    props.active
      ? `drop-shadow(0px 0px 20px rgba(0, 210, 255, 0.5))`
      : `drop-shadow(0px 4.64px 4.64px rgba(0, 0, 0, 0.25))`};
  border: 4px solid ${(props): string => (props.active ? props.theme.ixoNewBlue : 'transparent')};

  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  position: relative;
`

export const AssetCardSelection = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  background: ${(props): string => (props.selected ? props.theme.ixoNewBlue : props.theme.ixoGrey700)};
`

export const AssetCardHeader = styled.div<{ background: string }>`
  width: 100%;
  min-height: 170px;

  position: relative;
  background-image: url(${(props): string => props.background});
  background-size: 100% 100%;
`

export const AssetCardHeaderDotBG = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 70%;
  z-index: 1;

  background: url(${requireCheckDefault(require('assets/images/bg-dots.svg'))});
  background-size: cover;
`

export const AssetCardBody = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: #ffffff;
`

export const AssetCardBodyRow = styled.div`
  display: flex;
`

export const AssetLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
