import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const ListWrapper = styled.div`
  max-height: 500px;
`

export const NoTemplatePreviewWrapper = styled.div`
  background: #e8edee;
  text-align: center;
  color: #a5adb0;
  font-size: 16px;
  padding: 20px 0;
  border-radius: 5px;
  font-weight: bold;
  cursor: default;

  > div {
    margin-top: 10px;
  }
`
export const ModalWrapper = styled.div`
  > div {
    top: 55%;
    min-width: 270px;
    left: -25%;
    right: -15%;
    @media (min-width: ${deviceWidth.mobileSmall}px) {
      min-width: 300px;
      left: -15%;
    }
    @media (min-width: ${deviceWidth.desktop}px) {
      left: 0;
      right: -100%;
    }
  }
`
