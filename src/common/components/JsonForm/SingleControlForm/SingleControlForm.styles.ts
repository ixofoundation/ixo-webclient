import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ControlContainer = styled.div`
  .form-group.field-object {
    background: #f7f8f9;
    border: 1px solid #39c3e6;
    border-radius: 4px;
    margin-top: 1.75rem;
    padding: 2.125rem 1.25rem;
    @media (min-width: ${deviceWidth.mobile}px) {
      padding: 3.5rem 4.25rem;
    }
    .form-group.field.field-string div div[style] {
      border-style: none !important;
    }
  }

  #root {
    --focus-outline-style: none;
    --focus-box-shadow: none;
    --focus-standard-border: 1px solid #39c3e6;

    #root__title {
      font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
      font-weight: normal;
      font-size: 1.5rem;
      line-height: 1.2;
      letter-spacing: 0.3px;
      @media (min-width: ${deviceWidth.mobile}px) {
        font-size: 2.25rem;
      }
    }

    #root__description {
      font-family: ${(props: any): string => props.theme.fontRoboto};
      font-weight: normal;
      font-size: 1.125rem;
      line-height: normal;
      color: #7b8285;
    }
  }
`
