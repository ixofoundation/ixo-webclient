import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const Container = styled.div`
  position: relative;
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
  div hr {
    border-top: 0.0625rem solid #e8edee;
  }
  div hr.subdivider {
    border-color: ${(props): string => props.theme.highlight.light};
    margin-bottom: 3rem;
  }
  & .ReactCollapse--collapse {
    transition: height 200ms;
  }
`

export const DraggableContainer = styled.div`
  position: relative;
  margin-top: 1.75rem;

  &.draggable {
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #d8d8d8;
      border-radius: 4px;
      z-index: 0;
    }

    :hover {
      > div {
        border-color: ${(props) => props.theme.ixoNewBlue};
        transform: rotateZ(1deg);
        // transform-origin: 1% 99%;
      }
    }
  }
`

export const DraggableContainerContent = styled.div`
  position: relative;
  background: #f7f8f9;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  border-radius: 4px;
  padding: 2.125rem 1.25rem;
  transition: all 300ms ease-in-out;
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
  div hr {
    border-top: 0.0625rem solid #e8edee;
  }
  div hr.subdivider {
    border-color: ${(props): string => props.theme.highlight.light};
    margin-bottom: 3rem;
  }

  & .ReactCollapse--collapse {
    transition: height 200ms;
  }
`

export const AddSectionButton = styled.button`
  &:focus {
    outline: none;
  }
  border: none;
  color: ${(props): string => props.theme.highlight.light};
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > .expand-icon {
    cursor: pointer;
    transition: transform 0.2s;

    &.open {
      transform: rotate(-90deg);
    }
  }
`

export const AssistanceButton = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  background: none;

  top: 20px;
  right: 20px;

  svg path {
    stroke: ${(props): string => props.theme.highlight.light};
    fill: ${(props): string => props.theme.highlight.light};
  }
`
