import styled from 'styled-components'

export const MobileWrapper = styled.div`
  &.active {
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

  /* background: firebrick; */
  .SingleDatePicker .SingleDatePickerInput .SingleDatePicker_picker {
    top: 30px;
    width: 100vw;
    left: 0px;
    position: relative;
  }
`
export const MobileDateHeader = styled.header`
  width: 100vw;
  background: #002a3f;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #002a3f;
  position: absolute;
  z-index: 5;
  top: 0;
  right: 100px;
  left: 0;
`
export const HeadingItem = styled.button`
  cursor: pointer;
  border: none;
  outline: none !important;
  text-decoration: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
`

export const ApplyButtonWrapper = styled.div`
  position: absolute;
  top: 704px;
  left: 0px;
  z-index: 4;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ApplyButton = styled.button`
  position: relative;
  padding: 1rem 2rem;
  background: #04d0fb;
  background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
  border-radius: 4px;
  color: white;
  width: 100%;
  text-align: center;
  border: none;
  outline: none !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-top: 1.25rem;
  &:after {
    content: '';
    position: absolute;
    top: -1.25rem;
    left: -20px;
    height: 1px;
    width: 100vw;
    background-color: #e8edee;
  }
`
