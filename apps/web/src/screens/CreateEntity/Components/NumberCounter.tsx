import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ReactComponent as PlusIcon } from '/public/assets/images/icon-plus.svg'
import { ReactComponent as MinusIcon } from '/public/assets/images/icon-minus.svg'

const StyledInput = styled.input<{ $textAlign: string }>`
  border: none;
  width: 100%;
  height: 100%;
  text-align: ${(props): string => props.$textAlign};
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;

  &:focus-visible {
    outline: none;
  }
`

const ActionButton = styled.div<{ borderColor?: string }>`
  line-height: 0;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;

    path {
      fill: ${(props): string => props.borderColor ?? props.theme.ixoNewBlue};
    }
  }
`

interface Props {
  direction?: 'row' | 'row-reverse'
  label?: string
  width?: string
  height?: string
  disabled?: boolean
  value: number
  onChange: (value: number) => void
}

const NumberCounter: React.FC<Props> = ({
  width = '100%',
  height = 'auto',
  direction = 'row',
  label,
  value,
  disabled,
  onChange,
}): JSX.Element => {
  const theme: any = useTheme()
  const borderColor = theme.ixoNewBlue
  const [focused, setFocused] = useState(false)
  const active = value > 0 || focused

  return (
    <Box
      id='number-counter'
      position='relative'
      width={width}
      height={height}
      $borderWidth={'1px'}
      $borderColor={borderColor}
      $borderStyle={'solid'}
      $borderRadius={'0.5rem'}
      padding={2.5}
    >
      {label && (
        <Box
          position='absolute'
          transform='translateY(-50%)'
          left={direction === 'row' ? '10px' : undefined}
          right={direction === 'row' ? undefined : '10px'}
          top={active ? '0' : '50%'}
          transition={'top .2s'}
          background={theme.ixoWhite}
          $zIndex={1}
          $pointerEvents='none'
        >
          <Typography
            size={active ? 'sm' : 'xl'}
            weight={active ? 'bold' : 'medium'}
            color={active ? 'blue' : 'grey700'}
          >
            {label}
          </Typography>
        </Box>
      )}

      <Box
        position='absolute'
        top='50%'
        transform='translateY(-50%)'
        left={direction === 'row' ? '10px' : undefined}
        right={direction === 'row' ? undefined : '10px'}
        width='calc(100% - 100px)'
        height='100%'
      >
        <StyledInput
          type='text'
          pattern='[0-9]*'
          value={value}
          onChange={(event): void => onChange(Number(event.target.value || 0))}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
          $textAlign={direction === 'row' ? 'left' : 'right'}
          disabled={disabled}
        />
      </Box>

      <FlexBox
        position='absolute'
        transform={'translateY(-50%)'}
        top={'50%'}
        left={direction === 'row' ? undefined : '10px'}
        right={direction === 'row' ? '10px' : undefined}
        $alignItems='center'
        $gap={2}
      >
        <ActionButton onClick={(): void => onChange(value + 1)}>
          <PlusIcon />
        </ActionButton>
        <ActionButton onClick={(): void => onChange(Math.max(value - 1, 0))}>
          <MinusIcon />
        </ActionButton>
      </FlexBox>
    </Box>
  )
}

export default NumberCounter
