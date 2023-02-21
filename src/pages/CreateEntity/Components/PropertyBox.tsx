import { Box, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ReactComponent as LockIcon } from 'assets/images/icon-lock.svg'
import { ReactComponent as BinIcon } from 'assets/images/icon-trash-can.svg'

const Wrapper = styled.div`
  position: relative;

  & .action {
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 5px;
    transform: translate(50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #bcbfc0;

    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;

    svg > path,
    svg > line {
      stroke: ${(props): string => props.theme.ixoWhite};
    }

    &:hover {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }

  &:hover .action {
    display: flex;
  }
`

const Body = styled.div<{ disabled: boolean; size: number; status: 'hover' | 'full' | 'init' | 'req' }>`
  border-radius: 8px;
  width: ${(props): number => props.size}px;
  height: ${(props): number => props.size}px;
  pointer-events: ${(props): string => (props.disabled ? 'none' : 'auto')};
  padding: 0.5rem;

  background-color: ${({ status = 'init', theme }): string => {
    switch (status) {
      case 'hover':
        return theme.ixoNewBlue
      case 'full':
        return theme.ixoDarkBlue
      case 'req':
        return theme.ixoGrey700
      case 'init':
      default:
        return theme.ixoGrey300
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

    path {
      fill: ${(props): string => props.theme.ixoWhite};
    }
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
  inherited?: boolean
  set?: boolean
  label?: string
  size?: number
  disabled?: boolean
  hovered?: boolean
  noData?: boolean
  handleClick: () => void
  handleRemove?: () => void
}

const PropertyBox: React.FC<Props> = ({
  icon = undefined,
  required = false,
  inherited = false,
  disabled = false,
  hovered = false,
  noData = false,
  set,
  label,
  size = 110,
  handleClick,
  handleRemove,
}): JSX.Element => {
  const status: 'hover' | 'full' | 'init' | 'req' = useMemo(() => {
    if (hovered) {
      return 'hover'
    }
    if (inherited) {
      return 'full'
    }
    if (disabled) {
      return 'init'
    }
    if (set) {
      return 'full'
    }
    if (required) {
      return 'req'
    }
    if (noData) {
      return 'init'
    }
    return 'req'
  }, [disabled, inherited, required, set, hovered, noData])

  return (
    <Wrapper>
      {!inherited && !required && handleRemove && (
        <Box className='action' onClick={handleRemove}>
          <SvgBox svgWidth={6} svgHeight={6}>
            <BinIcon />
          </SvgBox>
        </Box>
      )}
      {inherited && (
        <Box className='action'>
          <LockIcon />
        </Box>
      )}
      <Body disabled={disabled} size={size} status={status} onClick={handleClick}>
        {icon && icon}
        {label && (
          <Typography size='md' weight='bold' color='white'>
            {label}
          </Typography>
        )}
      </Body>
    </Wrapper>
  )
}

export default PropertyBox
