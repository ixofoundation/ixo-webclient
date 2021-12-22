import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`

export const Container = styled.div`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  border: 1px solid #0c3549;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 20px;

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
    color: #688ea0 !important;
    background: #143f54 !important;
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
      color: ${(props): string => props.color} !important;
    }
  }

  ${DateFilterContainer} {
    > a.active {
      color: white !important;
      background: ${(props): string => props.backgroundColor} !important;
      border-color: ${(props): string => props.color} !important;
    }
  }
`
