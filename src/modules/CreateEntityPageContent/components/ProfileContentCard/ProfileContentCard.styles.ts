import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const FormWrapper = styled.div`
  .input-group input {
    width: initial;
    border-radius: 4px !important;
    @media (min-width: ${deviceWidth.mobileSmall}px) {
      margin-left: 0.625rem;
    }
  }
`

export const RemoveButton = styled.button`
  border: none;
  color: #39c3e6;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
`
