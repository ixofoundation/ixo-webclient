import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as IconChevDown } from 'assets/images/icon-chev-down.svg'
import { AssetTypeSelectionModal } from 'modals'

const Label = styled.label<{ focused?: boolean }>`
  position: absolute;
  left: ${(props): string => (props.focused ? '10px' : '50%')};
  transform: translate(${(props): string => (props.focused ? '0%' : '-50%')}, -50%);
  top: ${(props): string => (props.focused ? '-5px' : '50%')};
  pointer-events: none;
  transition: all 0.2s;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  line-height: 100%;
  font-size: ${(props): string => (props.focused ? '12px' : '20px')};
  color: ${(props): string => (props.focused ? props.theme.ixoNewBlue : props.theme.ixoMediumGrey)};
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 5px;

  & > svg > path {
    fill: ${(props): string => props.theme.ixoMediumGrey};
  }
`

const StyledValue = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 6px 10px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  line-height: 20px;
  font-size: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: transparent;
`

const SelectWrapper = styled.div<{ width: string; height: string }>`
  position: relative;
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  transition: all 0.2s;
  cursor: pointer;
`

interface Props {
  value: any
  label?: string
  width?: string
  height?: string
  handleChange: (value: any) => void
}

const SelectWithLabel: React.FC<Props> = ({
  value,
  label = '',
  width = '100%',
  height = 'auto',
  handleChange,
  ...rest
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <SelectWrapper width={width} height={height} onClick={(): void => setOpenModal(true)} {...rest}>
        <Label focused={!!value}>
          {label}
          {!value && <IconChevDown />}
        </Label>
        <StyledValue>{value}</StyledValue>
      </SelectWrapper>
      <AssetTypeSelectionModal open={openModal} onClose={(): void => setOpenModal(false)} handleChange={handleChange} />
    </>
  )
}

export default SelectWithLabel
