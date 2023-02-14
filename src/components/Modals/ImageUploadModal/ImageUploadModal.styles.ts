import styled from 'styled-components'

export const UploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props): string => props.theme.ixoGrey100};
  border-radius: 8px;
  width: 600px;
  height: 400px;
`

export const SelectImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & svg > path {
    fill: ${(props): string => props.theme.ixoNewBlue};
  }
`

export const DisplayImage = styled.div<{ background: string }>`
  background: url(${(props): string => props.background}) center no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  cursor: pointer;
`
