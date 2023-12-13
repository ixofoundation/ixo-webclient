import { FlexBox } from 'components/App/App.styles'
import styled from 'styled-components'
import { ReactComponent as PlusIconSvg } from 'assets/images/icon-plus.svg'

export const CardWrapper = styled(FlexBox)`
  padding: 1.75rem;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 0.5rem;
  width: 100%;

  & > div {
    width: 100%;
  }

  & input,
  & textarea {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
`

export const PlusIcon = styled(PlusIconSvg)<{ color?: string }>`
  width: 1.5rem;
  height: 1.5rem;
  path {
    fill: ${(props): string => props.color ?? props.theme.ixoNewBlue};
  }
`
