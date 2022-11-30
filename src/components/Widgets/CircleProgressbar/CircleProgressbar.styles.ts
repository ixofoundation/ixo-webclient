import styled from 'styled-components'

export const WidgetContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .progress {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    background: none;
  }

  .progress__meter,
  .progress__value {
    fill: none;
  }

  .progress__meter {
    stroke: #033c50;
  }

  .progress__value {
    stroke-linecap: round;
  }
`

export const ApprovedText = styled.span``

export const TotalText = styled.span``

export const Descriptor = styled.p`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Text = styled.div`
  position: absolute;
  z-index: 1;
  text-align: center;
  p {
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
    line-height: 1;
  }

  ${ApprovedText} {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }

  ${TotalText} {
    font-size: 30px;
    margin: 0;
  }

  ${Descriptor} {
    font-size: 16px;
    margin: 5px 0 0 0;
    line-height: 25px;
  }
`
