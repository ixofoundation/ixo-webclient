import styled from 'styled-components'

export const AssetCardWrapper = styled.div`
  filter: drop-shadow(0px 4.64px 4.64px rgba(0, 0, 0, 0.25));

  border-radius: 8px;
  overflow: hidden;
  height: 420px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  min-width: 290px;
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
  min-height: 170px;

  position: relative;
  background-image: url(${(props): string => props.background});
`

export const AssetCardBody = styled.div`
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
