import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as IconChevDown } from 'assets/images/icon-chev-down.svg'
import { TypeSelectionModal } from 'components/Modals'
import { Typography } from 'components/Typography'

const Label = styled.label<{ filled?: boolean }>`
  position: absolute;
  left: ${(props): string => (props.filled ? '7px' : '10px')};
  transform: translateY(-50%);
  top: ${(props): string => (props.filled ? '0' : '50%')};
  pointer-events: none;
  transition: all 0.2s;

  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  padding: ${(props): string => (props.filled ? '0 3px' : '0')};
  line-height: 100%;
  background: inherit;

  & > svg > path {
    fill: ${(props): string => props.theme.ixoMediumGrey};
  }
`

const StyledValue = styled(Typography)`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 6px 10px;
`

const SelectWrapper = styled.div<{ width: string; height: string }>`
  position: relative;
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  transition: all 0.2s;
  cursor: pointer;
  background: white;
`

interface Props {
  value: any
  label?: string
  width?: string
  height?: string
  handleChange: (value: any) => void
  options: string[]
}

const SelectWithLabel: React.FC<Props> = ({
  value,
  label = '',
  width = '100%',
  height = '36px',
  handleChange,
  options,
  ...rest
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const filled = useMemo(() => !!value, [value])

  return (
    <>
      <SelectWrapper width={width} height={height} onClick={(): void => setOpenModal(true)} {...rest}>
        <Label filled={filled}>
          <Typography
            weight={filled ? 'bold' : 'medium'}
            size={filled ? 'sm' : 'xl'}
            color={filled ? 'blue' : 'gray-medium'}
          >
            {label}
          </Typography>
          {!value && <IconChevDown />}
        </Label>
        <StyledValue size='xl' weight='bold'>
          {value}
        </StyledValue>
      </SelectWrapper>
      <TypeSelectionModal
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        handleChange={handleChange}
        title={`Select the ${label}`}
        options={options}
      />
    </>
  )
}

export default SelectWithLabel
