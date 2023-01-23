import { FlexBox } from 'components/App/App.styles'
import React from 'react'
import styled from 'styled-components'
import { Typography } from 'components/Typography'

const EllipseWrapper = styled.div<{ value: boolean }>`
  position: relative;
  background-color: ${(props): string => (props.value ? props.theme.ixoNewBlue : props.theme.ixoLightGrey2)};
  border-radius: 100px;
  width: 40px;
  height: 20px;
`

const Ellipse = styled.div<{ value: boolean }>`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: ${(props): string => props.theme.ixoMediumGrey};
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.value ? `right: 0;` : `left: 0;`)}
`

interface Props {
  value: boolean
  onLabel?: string
  offLabel?: string
  onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ onLabel, offLabel, value, onChange }): JSX.Element => {
  return (
    <FlexBox alignItems='center' gap={4} className='cursor-pointer' onClick={() => onChange(!value)}>
      {offLabel && (
        <Typography size='xl' color={!value ? 'blue' : 'gray-medium'}>
          {offLabel}
        </Typography>
      )}
      <EllipseWrapper value={value}>
        <Ellipse value={value} />
      </EllipseWrapper>
      {onLabel && (
        <Typography size='xl' color={value ? 'blue' : 'gray-medium'}>
          {onLabel}
        </Typography>
      )}
    </FlexBox>
  )
}

export default Switch
