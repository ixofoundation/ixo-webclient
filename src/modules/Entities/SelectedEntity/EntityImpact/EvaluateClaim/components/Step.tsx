import React from 'react'
import styled from 'styled-components'
// import Tick from 'assets/icons/EvaluateClaim/Tick'

const Number = styled.div`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  font-size: 15px;
  color: #d1d5de;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Label = styled.div`
  color: #bbc0cc;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const Line = styled.hr`
  border-top: 3px dotted #ffffff;
  position: absolute;
  width: 3.25rem;
  transform: translateX(85%);
`

const Container = styled.div<{
  isActive?: boolean
  isCompleted?: boolean
  isDisabled?: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  pointer-events: ${(props): string => (props.isDisabled ? 'none' : 'auto')};

  ${Number} {
    background: ${(props: any): string => (props.isActive ? '#00D2FF' : props.isDisabled ? '' : '#368BD6')};
    color: ${(props: any): string => (!props.isDisabled ? 'white' : '')};
  }

  ${Label} {
    color: ${(props: any): string => (!props.isDisabled ? 'black' : '')};
  }

  ${Line} {
    border-color: ${(props: any): string => (props.isCompleted ? '#00D2FF' : '')};
  }

  &:last-of-type {
    ${Line} {
      display: none;
    }
  }
`

export interface Props {
  label: string
  number: number
  onClickStep?: (stepNumber: number) => void
  isActive?: boolean
  isCompleted?: boolean
  isDisabled?: boolean
}

const Step: React.FunctionComponent<Props> = ({
  label,
  number,
  isActive,
  isDisabled = false,
  isCompleted,
  onClickStep,
}) => {
  return (
    <Container
      isActive={isActive}
      isCompleted={isCompleted && !isDisabled}
      isDisabled={isDisabled}
      onClick={(): void => onClickStep!(number)}
    >
      <Number>
        {/* {isCompleted && !isDisabled ? <Tick /> : number} */}
        {number}
        {/* <Line />  */} {/* FIXME: should be rendered when the Enrichment / History are available  */}
      </Number>
      <Label>{label}</Label>
    </Container>
  )
}

export default Step
