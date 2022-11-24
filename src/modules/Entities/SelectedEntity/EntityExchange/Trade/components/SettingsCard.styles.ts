import styled from 'styled-components'

export const SettingsCardWrapper = styled.div``

export const SettingsCardOption = styled.div`
  padding: 7px 0px;
  border-bottom: 2px solid ${(props): string => props.theme.fontBlueDisabled};
`

export const SettingsCardOptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & span {
    font-size: 24px;
    line-height: 41px;
    font-weight: 400;
    font-family: ${(props): string => props.theme.secondaryFontFamily};
  }

  & img {
    transition: all 0.2s;
    &.reverse {
      transform: rotateZ(180deg);
    }
  }
`

export const SettingsCardOptionBody = styled.div<{ height: string }>`
  transition: all 0.2s;
  height: ${(props): string => props.height};
  opacity: ${(props): number => (props.height === '0' ? 0 : 1)};
  pointer-events: ${(props): string => (props.height === '0' ? 'none' : 'auto')};
`

export const SlippageSettingBody = styled.div``
export const SlippageSettingOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const SlippageSettingOption = styled.div<{ isSelected: boolean }>`
  border: 1px solid ${(props): string => (props.isSelected ? props.theme.fontDarkBlueButtonHover : '#0F3F55')};
  background-color: #0f3f55;
  border-radius: 8px;
  padding: 0px 7px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props): string => props.theme.fontDarkBlueButtonHover};
  }
`

export const SlippageSettingSlider = styled.input`
  margin: 25px 0;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: ${(props): string => props.theme.ixoBlue};
  height: 3px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${(props): string => props.theme.ixoBlue};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${(props): string => props.theme.ixoBlue};
    cursor: pointer;
  }
`

export const NetworkSettingBody = styled.div``

export const NetworkSettingOption = styled.div<{ isSelected: boolean }>`
  cursor: pointer;

  &:hover {
    span {
      color: '#FFFFFF';
    }

    span.dot {
      background-color: '#FFFFFF';
    }
  }

  & span {
    font-family: ${(props): string => props.theme.secondaryFontFamily}
    font-weight: 400;
    font-size: 24px;
    line-height: 41px;
    color: ${(props): string => (props.isSelected ? '#FFFFFF' : '#227878')};
  }

  & span.dot {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: ${(props): string => (props.isSelected ? props.theme.fontDarkBlueButtonHover : '#227878')};
  }
`
