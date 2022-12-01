import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import { EntityType } from '../../../../../types/entities'

export const SearchWrapper = styled.div`
  background: white;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transform: translateY(-50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  z-index: 4;
  > * {
    flex: 1;
    border-radius: 4px;
  }
  .search-input-wrapper {
    flex: 3;
    .form-control {
      margin: 0;
    }
    > *,
    input {
      height: 100%;
    }
    .search-input > p {
      @media (max-width: ${deviceWidth.mobile}px) {
        font-size: 0.9rem;
      }
    }
  }
  color: black;
`

export const ModalButton = styled.div`
  cursor: pointer;
  background: #e8edee;
  padding: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  overflow: visible;
  font-size: 18px;
  white-space: nowrap;
  width: 190px;
  height: 50px;
  line-height: 50px;
  > * {
    display: block;
  }
  & > svg:first-child {
    width: 1em;
    margin-right: 0.5rem;
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-right: 0;
    }
  }

  span.modal-text {
    @media (max-width: ${deviceWidth.mobile}px) {
      display: none;
    }
  }

  .down-icon {
    margin-left: auto;
    transition: all 0.3s;
    transform-origin: center;
    & > svg {
      width: 1em;
      margin-left: 0.5rem;
    }
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-left: 6px;
    }
  }
  :after {
    position: absolute;
    top: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
  &.modal-open {
    overflow: visible;
    :after {
      content: '';
    }
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: auto;
  }
`

export const SearchIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  flex: initial;
  text-align: center;
`

export const SearchModal = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  z-index: 10;
  background: white;
  width: 100%;
  padding: 1.5em 2.875em 4.5em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const SearchHeading = styled.h3`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 600;
  font-size: 1.25rem;
  box-sizing: border-box;
  margin: 0.825rem 0 1.5rem;
`

export const SearchButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1.75rem;
`

export const SearchFilterButton = styled.button<{ color: string }>`
  color: #4d4d4d;
  outline: none !important;
  background: none;
  text-align: center;
  width: calc(33.333% - 1rem);
  margin: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding: 1.5rem;
  font-weight: 500;
  svg path,
  svg circle {
    fill: #4d4d4d;
  }

  &.active {
    color: #4d4d4d;
  }

  &:hover:not(.disabled) {
    color: #fff;
    svg path,
    svg circle {
      fill: #fff;
    }
  }
  ${({ color }): any =>
    Object.keys(EntityType).map((key) => {
      const className = key.toLowerCase()
      // const color = entityTypeMap[key].themeColor

      return `&.${className} {
          border: 2px solid ${color};
          &.active {
            background: linear-gradient(
              90deg,
              ${color} 0%,
              ${color} 5px,
              transparent 6px,
              transparent 100%
            );
          }
          &:hover:not(.disabled) {
            background: linear-gradient(90deg, ${color} 0%, ${color} 100%);
          }
        }`
    })}
  &.disabled {
    border-color: #a5adb0;
    color: #a5adb0;
    cursor: not-allowed;
    i {
      color: #a5adb0;
    }
    svg path {
      fill: #a5adb0;
    }
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    width: calc(100% - 1rem);
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    padding: 1.5rem 2rem;
  }
`

export const ButtonContent = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
`
