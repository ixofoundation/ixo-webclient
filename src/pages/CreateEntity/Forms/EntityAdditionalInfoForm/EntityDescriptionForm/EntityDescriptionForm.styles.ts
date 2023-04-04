import styled from 'styled-components'
import { AttributeInput } from '../EntityAttributesForm/EntityAttributesForm.styles'
import DefCountryDropDown from 'components/Controls/IconDropDown/CountryDropDown/CountryDropDown'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const BrandNameInput = styled(AttributeInput)``

export const CountryDropDown = styled(DefCountryDropDown)`
  select {
    background: white;
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
    border-radius: 8px !important;
  }
`
