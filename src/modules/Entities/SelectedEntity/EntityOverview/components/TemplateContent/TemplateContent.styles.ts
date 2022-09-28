import styled from 'styled-components'

export const Container = styled.div``

export const AdditionalInfoList = styled.dl`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 18px;
`

export const AdditionalInfoRow = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${(props): string => props.direction ?? 'row'};
`

export const AdditionalInfoTitle = styled.dt`
  font-weight: 700;
`

export const AdditionalInfoContent = styled.dd`
  font-weight: 400;
`
