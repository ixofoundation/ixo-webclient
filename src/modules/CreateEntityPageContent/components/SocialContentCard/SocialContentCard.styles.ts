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
