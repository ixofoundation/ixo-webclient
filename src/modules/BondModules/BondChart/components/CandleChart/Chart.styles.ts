import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const ChartContainer = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    width: 100%;
  }

  svg {
    width: 100% !important;
  }

  .apexcharts-canvas {
    width: 100% !important;
  }
`

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`
interface FilterContainerProp {
  color: string
  backgroundColor: string
}

export const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  > a {
    margin-left: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #688EA0 !important;
    background: #143F54 !important;
  }
`

export const FilterContainer = styled.div<FilterContainerProp>`
  margin-top: 1.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    > a {
      font-size: 0.75rem;
      padding-top: 0.125rem;
      padding-bottom: 0.125rem;
      border-radius: 0.25rem;
      margin-bottom: 0rem;
      border-color: transparent;
    }
  }

  > div:first-of-type {
    > a {
      color: ${ props => props.color } !important;
    }
  }

  ${DateFilterContainer} {
    > a.active {
      color: white !important;
      background: ${ props => props.backgroundColor } !important;
      border-color: ${ props => props.color } !important;
    }
  }
`