import styled from 'styled-components'
import DefCountryDropDown from 'components/Controls/IconDropDown/CountryDropDown/CountryDropDown'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CountryDropDown = styled(DefCountryDropDown)`
  select {
    background: white;
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
    border-radius: 8px !important;
    font-size: 20px;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    height: 48px;

    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &::-ms-expand {
      display: none;
    }
  }
`
