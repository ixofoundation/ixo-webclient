import CountryDropDown from 'common/components/Controls/IconDropDown/CountryDropDown/CountryDropDown'
import React from 'react'
import styled from 'styled-components'

const CountrySelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledLabel = styled.label`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  margin-bottom: 8px;
`
const StyledCountryDropDown = styled(CountryDropDown)``

interface Props {
  label: string
  country: string
  setCountry: (country: string) => void
}

const CountrySelector: React.FC<Props> = ({
  label,
  country,
  setCountry,
  ...rest
}): JSX.Element => {
  return (
    <CountrySelectorWrapper {...rest}>
      <StyledLabel>{label}</StyledLabel>
      <StyledCountryDropDown
        value={country}
        onChange={setCountry}
        onBlur={setCountry}
        onFocus={setCountry}
      />
    </CountrySelectorWrapper>
  )
}

export default CountrySelector
