import styled from 'styled-components'

import SearchBlueIcon from 'assets/images/icon-search.svg'

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
`

export const OptionBox = styled.div<{ filled?: boolean }>`
  background: ${(props): string => (props.filled ? props.theme.ixoGrey300 : props.theme.ixoWhite)};
  border: 4px solid ${(props): string => props.theme.ixoGrey300};
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
    fill: white;
  }

  &:hover,
  &.active {
    border-color: ${(props): string => props.theme.ixoNewBlue};
    ${(props): string => (props.filled && `background: ${props.theme.ixoNewBlue};`) || ''}
    ${(props): string => (!props.filled && `svg path { fill: ${props.theme.ixoNewBlue}; }`) || ''}
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
    fill: ${(props): string => props.theme.ixoGrey700};
  }
`
