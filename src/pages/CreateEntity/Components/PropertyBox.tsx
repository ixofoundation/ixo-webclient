import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  & .remove {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: ${(props): string => props.theme.ixoWhite};
    background: ${(props): string => props.theme.ixoLightGrey2};

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 30px;
    font-weight: 500;

    &:hover {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`

const Body = styled.div<{ size: number; status: 'full' | 'init' | 'req' }>`
  border-radius: 8px;
  width: ${(props): number => props.size}px;
  height: ${(props): number => props.size}px;

  background-color: ${({ status = 'init', theme }): string => {
    switch (status) {
      case 'full':
        return theme.ixoColor1
      case 'req':
        return theme.ixoMediumGrey
      case 'init':
      default:
        return theme.ixoLightGrey2
    }
  }};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  transition: all 0.2s;
  cursor: pointer;

  & > svg {
    width: 42px;
    height: 42px;
  }

  & > span {
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`

interface Props {
  icon?: JSX.Element
  required?: boolean
  set?: boolean
  label?: string
  size?: number
  status?: 'full' | 'init' | 'req'
  handleClick: () => void
  handleRemove?: () => void
}

const PropertyBox: React.FC<Props> = ({
  icon = undefined,
  required = false,
  set,
  label,
  size = 110,
  status = 'init',
  handleClick,
  handleRemove,
}): JSX.Element => {
  return (
    <Wrapper>
      {!required && handleRemove && (
        <Box className='remove' onClick={handleRemove}>
          —
        </Box>
      )}
      <Body size={size} status={status} onClick={handleClick}>
        {icon && icon}
        {label && (
          <Typography weight='bold' color='white'>
            {label}
          </Typography>
        )}
      </Body>
    </Wrapper>
  )
}

export default PropertyBox
