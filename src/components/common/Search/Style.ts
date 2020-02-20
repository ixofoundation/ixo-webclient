import styled from 'styled-components'

export const SearchWrapper = styled.div`
  background: white;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  border-radius: 4px;
  transform: translateY(-50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Roboto, sans-serif;
  > * {
    flex: 1;
    border-radius: 4px;
  }
  .search-input-wrapper {
    flex: 3;
    > * {
      height: 100%;
    }
  }
`

export const ModalButton = styled.div`
  background: #e8edee;
  padding: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  overflow: visible;
  > * {
    display: block;
  }
  .filter-icon,
  .icon-down {
    width: 1rem;
    height: 1rem;
  }
  .filter-icon {
    margin-right: 0.5rem;
  }
  .icon-down {
    margin-left: auto;
    transition: all 0.3s;
    transform-origin: center;
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
  &.modal-open:after {
    content: '';
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
  i {
    color: #83d9f2;
  }
`

export const SearchModal = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  z-index: 10;
  background: white;
  width: 100%;
  padding: 1.5em 2.875em 4.5em;
`

export const SearchHeading = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  box-sizing: border-box;
  margin: 0.825rem 0 1.5rem;
`

export const SearchButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
`

export const SearchFilterButton = styled.div`
  border: 1px solid #39c3e6;
  color: #39c3e6;
  text-align: center;
  width: calc(33.333% - 1rem);
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  i {
    color: #39c3e6;
  }
  > * {
    display: block;
    width: 100%;
  }
  &.active,
  &:hover:not(.disabled) {
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    color: white;
    i {
      color: white;
    }
  }
  &.disabled {
    border-color: #a5adb0;
    color: #a5adb0;
    cursor: not-allowed;
    i {
      color: #a5adb0;
    }
  }
`
