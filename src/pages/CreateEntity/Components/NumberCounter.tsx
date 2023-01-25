import React from 'react'
import styled from 'styled-components'
import { Box, FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as MinusIcon } from 'assets/images/icon-minus.svg'

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
  value: number
  onChange: (value: number) => void
}

const NumberCounter: React.FC<Props> = ({
  width = '100%',
  height = 'auto',
  direction = 'row',
  label,
  value,
  onChange,
}): JSX.Element => {
  const borderColor = theme.ixoNewBlue
  return (
    <Box
      position='relative'
      width={width}
      height={height}
      borderWidth={'1px'}
      borderColor={borderColor}
      borderStyle={'solid'}
      borderRadius={'0.5rem'}
      padding={2.5}
    >
      {label && (
        <Box
          position='absolute'
          transform='translateY(-50%)'
          left={direction === 'row' ? '10px' : undefined}
          right={direction === 'row' ? undefined : '10px'}
          top={value > 0 ? '0' : '50%'}
          transition={'top .2s'}
          background={theme.ixoWhite}
        >
          <Typography
            size={value > 0 ? 'sm' : 'xl'}
            weight={value > 0 ? 'bold' : 'medium'}
            color={value > 0 ? 'blue' : 'grey700'}
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
        display={label && value === 0 ? 'none' : 'block'}
      >
        <Typography size='xl' weight='medium'>
          {value}
        </Typography>
      </Box>

      <FlexBox
        position='absolute'
        transform={'translateY(-50%)'}
        top={'50%'}
        left={direction === 'row' ? undefined : '10px'}
        right={direction === 'row' ? '10px' : undefined}
        alignItems='center'
        gap={2}
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
