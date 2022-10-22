import styled from 'styled-components'

export const AssetCardWrapper = styled.div<{ active?: boolean }>`
  filter: ${(props): string =>
    props.active
      ? `drop-shadow(0px 0px 20px rgba(0, 210, 255, 0.5))`
      : `drop-shadow(0px 4.64px 4.64px rgba(0, 0, 0, 0.25))`};
  border: 4px solid
    ${(props): string =>
      props.active ? props.theme.ixoNewBlue : 'transparent'};

  border-radius: 8px;
  height: 420px;
  cursor: pointer;
  margin: 8px;

  display: flex;
  flex-direction: column;
`

export const AssetCardHeader = styled.div<{ background: string }>`
  min-height: 170px;

  position: relative;
  background-image: url(${(props): string => props.background});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const AssetCardHeaderDotBG = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 70%;
  z-index: 1;

  background: url(${require('assets/images/bg-dots.svg')});
  background-size: cover;
`

export const AssetCardHeaderLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 115px;
  height: 115px;
`

export const AssetCardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: #ffffff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const AssetCardBodyRow = styled.div`
  display: flex;
`

export const AssetLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
