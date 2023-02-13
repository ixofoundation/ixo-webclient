import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const ChartContainer = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    width: 100%;
  }
`

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`

export const RangeDateWrapper = styled.div`
  margin-left: 0.25rem;

  .DateRangePickerInput {
    display: flex;
    background: #143f54;
    border-radius: 0.25rem;
    overflow: hidden;

    .DateInput {
      max-width: 5.625rem;
      background: #143f54;

      .DateInput_input {
        background: #143f54;
        color: ${(props): string => props.theme.highlight.light};
      }

      input {
        ::placeholder {
          color: #107591;
          font-size: 0.75rem;
          opacity: 0.6;
        }

        height: 1.5rem;
      }

      ::after {
        border: none;
      }
    }

    .DateInput:last-of-type {
      ::after {
        content: '\\e952';
        color: #107591;
        transform: translateY(-50%);
        font-family: 'icomoon';
        font-size: 0.8rem;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
      }
    }

    .DateRangePickerInput_arrow {
      width: 1px;
      background: #002a3f;
      visibility: initial;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;

      svg {
        display: none;
      }
    }
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
      color: ${(props) => props.color} !important;
    }
  }

  ${RangeDateWrapper} {
    input {
      ::placeholder {
        color: ${(props) => props.color} !important;
      }
    }

    .DateInput:last-of-type {
      ::after {
        color: ${(props) => props.color} !important;
      }
    }
  }

  ${DateFilterContainer} {
    > a.active {
      color: white !important;
      background: ${(props) => props.backgroundColor} !important;
      border-color: ${(props) => props.color} !important;
    }
  }
`
