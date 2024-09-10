import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import IconChevDown from 'assets/images/icon-chev-down.svg'
import { TypeSelectionModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { SvgBox } from 'components/App/App.styles'

const Label = styled.label<{ $filled?: boolean }>`
  position: absolute;
  left: ${(props): string => (props.$filled ? '7px' : '10px')};
  transform: translateY(-50%);
  top: ${(props): string => (props.$filled ? '0' : '50%')};
  pointer-events: none;
  transition: all 0.2s;

  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  padding: ${(props): string => (props.$filled ? '0 3px' : '0')};
  line-height: 100%;
  background: inherit;

  & > svg > path {
    fill: ${(props): string => props.theme.ixoGrey700};
  }
`

const StyledValue = styled(Typography)`
  padding: 6px 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const SelectWithModal: React.FC<Props> = ({
  value,
  label = '',
  width = '100%',
  height = '48px',
  handleChange,
  options,
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const filled = useMemo(() => !!value, [value])

  return (
    <>
      <SelectWrapper width={width} height={height} onClick={(): void => setOpenModal(true)} {...rest}>
        <Label $filled={filled}>
          <Typography
            weight={filled ? 'bold' : 'medium'}
            size={filled ? 'sm' : 'xl'}
            color={filled ? 'blue' : 'grey500'}
          >
            {label}
          </Typography>
          {!value && (
            <SvgBox color={theme.ixoGrey500}>
              <IconChevDown />
            </SvgBox>
          )}
        </Label>
        <StyledValue size='xl' weight='medium'>
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

export default SelectWithModal
