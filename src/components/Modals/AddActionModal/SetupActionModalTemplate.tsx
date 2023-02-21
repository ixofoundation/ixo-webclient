import React from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'
import styled from 'styled-components'

const inputHeight = '48px'
const BodyWrapper = styled(FlexBox)`
  input,
  select,
  #number-counter {
    height: ${inputHeight};
    font-family: ${(props) => props.theme.primaryFontFamily};
    font-size: 20px;
    font-weight: 500;
    background: transparent;
  }
  button {
    font-weight: 500;
  }
`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  action: TDeedActionModel
  validate?: boolean
  onClose: () => void
  onSubmit: () => void
}

const SetupActionModalTemplate: React.FC<Props> = ({
  open,
  action,
  validate,
  onClose,
  onSubmit,
  children,
}): JSX.Element => {
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8} width='440px'>
        <FlexBox alignItems='center' gap={4}>
          <SvgBox color={theme.ixoBlack} svgWidth={8} svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {action.type}
          </Typography>
        </FlexBox>

        <BodyWrapper width='100%' direction='column' gap={4}>
          {children}
        </BodyWrapper>

        <FlexBox width='100%'>
          <Button variant='primary' onClick={onSubmit} disabled={!validate} style={{ width: '100%' }}>
            Confirm
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default SetupActionModalTemplate
