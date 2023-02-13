import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const Toolbar = styled.div`
  border-top: 1px solid #e8edee;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  .toolbar-item {
    cursor: pointer;
    margin: 1.25rem 0.75rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .divider {
    height: 1.875rem;
    width: 1px;
    margin: 0 1.125rem;
    background: #e8edee;
  }
`
export const Container = styled.div`
  background: #f7f8f9;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  border-radius: 4px;
  margin-top: 1.75rem;
  padding: 2.125rem 1.25rem;
  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 3.5rem 4.25rem;
  }

  h2 {
    font-family: ${(props: any): string => props.theme.secondaryFontFamily};
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    @media (min-width: ${deviceWidth.mobile}px) {
      font-size: 2.25rem;
    }
  }

  & .ReactCollapse--collapse {
    transition: height 200ms;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > .expand-icon {
    cursor: pointer;
    transition: transform 0.2s;

    &.open {
      transform: rotate(-90deg);
    }
  }
`
