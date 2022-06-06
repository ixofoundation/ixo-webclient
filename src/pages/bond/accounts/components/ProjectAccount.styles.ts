import styled from 'styled-components'

export interface InfoWrapperProps {
  currency: string
  amount: number
  subLabel: string
  size: number
}

interface InfoWrapperContainerProps {
  size: number
}

interface ContainerProps {
  selected?: boolean
}

export const Container = styled.div<ContainerProps>`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  border: ${(props): any => (props.selected ? '1px solid #39C3E6' : 'none')};
  // height: 100%;
  height: 220px;
  padding: 20px 20px 0 20px;
  cursor: pointer;
`

export const InfoWrapperContainer = styled.div<InfoWrapperContainerProps>`
  font-family: ${(props: any): string => props.theme.fontRobotoRegular};
  color: white;
  letter-spacing: 0.3px;
  .main {
    font-size: ${(props): any => props.size * 16}px;
    line-height: initial;
  }
  .sub {
    font-size: 12px;
    color: ${(props): any => (props.size === 2 ? 'white' : '#436779')};
    line-height: initial;
  }
`

export const StyledLabel = styled.label`
  min-width: 60px;
  background: #107591;
  border-radius: 6px;
  color: white;
  letter-spacing: 0.3px;
  text-align: center;
  font-weight: normal;
  margin: 0;
`

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Address = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 18px;
  color: #ffffff;
`

export const QrCodeView = styled.canvas`
  width: 110px !important;
  height: 110px !important;
`
