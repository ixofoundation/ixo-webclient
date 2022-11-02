import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

const displayNone = css`
  display: none;
`

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  letter-spacing: 0.3px;
`

export const PageRow = styled.div`
  display: flex;
`

export const PropertyBox = styled.div<{
  full?: boolean
  grey?: boolean
  show?: boolean
}>`
  border-radius: 8px;
  width: 110px;
  height: 110px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background: ${(props): string =>
    props.grey
      ? props.theme.ixoLightGrey2
      : props.full
      ? props.theme.ixoColor1
      : props.theme.ixoMediumGrey};
  transition: all 0.2s;
  cursor: pointer;

  ${(props): FlattenSimpleInterpolation => !props.show && displayNone}

  & > svg {
    width: 42px;
    height: 42px;
  }

  & > span {
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`
