import styled from 'styled-components'
import { ReactComponent as SearchBlueIcon } from 'assets/images/icon-search.svg'
import { theme } from 'modules/App/App.styles'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 50px;
  letter-spacing: 0.3px;
`

export const PageRow = styled.div`
  display: flex;
`

export const Selections = styled.div`
  display: flex;
  gap: 100px;

  margin-bottom: 60px;
`

export const OptionBox = styled.div<{ filled?: boolean }>`
  background: ${(props): string =>
    props.filled ? props.theme.ixoLightGrey2 : props.theme.ixoWhite};
  border: 4px solid ${(props): string => props.theme.ixoLightGrey2};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  width: 90px;
  height: 90px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;

  svg path {
    transition: all 0.2s;
  }

  &:hover,
  &.active {
    border-color: ${(props): string => props.theme.ixoNewBlue};
    ${(props): string =>
      props.filled && `background: ${props.theme.ixoNewBlue};`}
    ${(props): string =>
      !props.filled && `svg path { fill: ${props.theme.ixoNewBlue}; }`}
  }

  & > .label {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const SearchIcon = styled(SearchBlueIcon)`
  path {
    fill: ${(props): string => props.theme.ixoMediumGrey};
  }
`

export const SearchInputStyles = {
  fontFamily: theme.secondaryFontFamily,
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 28,
}
