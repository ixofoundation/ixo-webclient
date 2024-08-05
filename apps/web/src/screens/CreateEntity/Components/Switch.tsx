import { FlexBox } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Typography } from 'components/Typography'

const EllipseWrapper = styled.div<{ value: boolean; size: number }>`
  position: relative;
  background-color: ${(props): string => (props.value ? props.theme.colors.blue[5] : props.theme.ixoGrey300)};
  border-radius: 100px;
  ${({ size }): string | undefined => (size ? `width: ${size * 2 * 0.25}rem` : undefined)};
  ${({ size }): string | undefined => (size ? `height: ${size * 0.25}rem` : undefined)};
`

const Ellipse = styled.div<{ value: boolean; size: number }>`
  position: absolute;
  ${({ size }): string | undefined => (size ? `width: ${size * 0.25}rem` : undefined)};
  ${({ size }): string | undefined => (size ? `height: ${size * 0.25}rem` : undefined)};
  border-radius: 100%;
  background-color: ${(props): string => props.theme.ixoGrey700};
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.value ? `right: 0;` : `left: 0;`)}
`

interface Props {
  value: boolean
  onLabel?: string
  offLabel?: string
  size?: 'base' | 'md' | 'sm'
  onChange?: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ size = 'base', onLabel, offLabel, value, onChange }): JSX.Element => {
  const px = useMemo(() => {
    switch (size) {
      case 'sm':
        return 3
      case 'md':
        return 4
      case 'base':
      default:
        return 5
    }
  }, [size])
  return (
    <FlexBox $alignItems='center' $gap={4} className='cursor-pointer' onClick={() => onChange && onChange(!value)}>
      {offLabel && (
        <Typography size='xl' color={!value ? 'blue' : 'grey700'}>
          {offLabel}
        </Typography>
      )}
      <EllipseWrapper value={value} size={px}>
        <Ellipse value={value} size={px + 1} />
      </EllipseWrapper>
      {onLabel && (
        <Typography size='xl' color={value ? 'blue' : 'grey700'}>
          {onLabel}
        </Typography>
      )}
    </FlexBox>
  )
}

export default Switch
