import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import XIcon from 'assets/images/x-icon.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import {
  DashboardThemeContext,
  ThemeContext,
} from 'common/components/Dashboard/Dashboard'

interface ValueProps {
  value: string
  preIcon?: boolean
}

const ValueComponentContainer = styled.div<{ theme: ThemeContext }>`
  background: ${({ theme }): string => (theme.isDark ? '#143F54' : '#e9edf5')};
  // padding-left: 2em;
  position: relative;
`

const StyledValueContainer = styled.div`
  padding: 0.8em 4em 0.8em 0;
  align-items: center;
  flex-direction: column;
  display: flex;
  img {
    margin-right: 1em;
  }
  span {
    line-height: 120%;
  }
`

const StyledEyeContainer = styled.div<{ theme: ThemeContext }>`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  background-color: ${({ theme }): string =>
    theme.isDark ? '#107591' : '#e9edf5'};
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 3px solid transparent;
`

const ValueCell: FunctionComponent<ValueProps> = ({
  value,
  preIcon = true,
}) => {
  const theme = useContext(DashboardThemeContext)

  return (
    <ValueComponentContainer theme={theme}>
      <StyledValueContainer>
        {preIcon && <img alt="" src={XIcon} />}
        <span>{value.match(/(.*) (\(\d+\))/)[1]}</span>
        <span>{value.match(/(.*) (\(\d+\))/)[2]}</span>
      </StyledValueContainer>
      <StyledEyeContainer theme={theme}>
        <img alt="" src={EyeIcon} />
      </StyledEyeContainer>
    </ValueComponentContainer>
  )
}

export default ValueCell
