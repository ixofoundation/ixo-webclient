import styled from 'styled-components'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'

export const Layout = styled(LayoutWrapper)`
  background: #f0f3f9 !important;
  font-weight: 400;
  padding-top: 0px;
  padding-bottom: 10rem;
`

export const ActionButton = styled.button`
  outline: none !important;
  border-radius: 0.25rem;
  font-weight: bold;

  &.btn-save {
    color: ${(props: any): string => props.theme.fontSkyBlue};
    border: 1px solid ${(props: any): string => props.theme.fontSkyBlue};
    width: 6.25rem;
    height: 2.25rem;
  }

  &.btn-submit {
    color: white;
    border: 1px solid ${(props: any): string => props.theme.fontSkyBlue};
    background: ${(props: any): string => props.theme.fontSkyBlue};
    width: 8rem;
    height: 2.25rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SubmitContainer = styled.div`
  text-align: right;
  svg {
    vertical-align: top;
    margin-left: 0.5rem;
  }
`

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #437c98;
`
