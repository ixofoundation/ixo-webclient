import styled from 'styled-components'
import DefCountryDropDown from 'components/Controls/IconDropDown/CountryDropDown/CountryDropDown'

const CountryDropDown = styled(DefCountryDropDown)`
  width: 100%;

  select {
    background: white;
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
    border-radius: 8px !important;
    font-family: ${(props) => props.theme.primaryFontFamily};
    font-size: 20px;
    line-height: 100%;
    padding: 8px;
    width: 100%;
    height: 48px;

    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: hidden;

    &::-ms-expand {
      display: none;
    }
  }
`

export default CountryDropDown
