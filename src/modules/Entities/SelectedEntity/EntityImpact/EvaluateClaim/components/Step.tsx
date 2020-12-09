import React from 'react'
import styled from 'styled-components'

const Number = styled.div`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  font-size: 15px;
  color: #D1D5DE;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Label = styled.div`
  color: #BBC0CC;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const Line = styled.hr`
  border-top: 3px dotted #FFFFFF;
  position: absolute;
  width: 3.25rem;
  transform: translateX(85%);
`

const Container = styled.div<{ isActive?: boolean, isCompleted?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Number} {
    background: ${(props: any): string => props.isActive || props.isCompleted ? '#00D2FF' : ''};
    color: ${(props: any): string => props.isActive || props.isCompleted ? 'white' : ''};
  }

  ${ Label } {
    color: ${(props: any): string => props.isActive || props.isCompleted ? 'black' : ''};
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
  isActive?: boolean
  isCompleted?: boolean
}

const Step: React.FunctionComponent<Props> = ({label, number, isActive}) => {
  return (
    <Container isActive={ isActive }>
      <Number>
        { number }
        <Line />
      </Number>
      <Label>
        { label }
      </Label>
    </Container>
  )
}

export default Step;