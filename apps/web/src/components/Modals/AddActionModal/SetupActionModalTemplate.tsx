import React from 'react'
import * as Modal from 'react-modal'

import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Button } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import styled, { useTheme } from 'styled-components'
import { ProposalActionConfig } from 'constants/entity'

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
  width?: string
  open: boolean
  action: TProposalActionModel
  validate?: boolean
  noTitle?: boolean
  onClose: () => void
  onSubmit?: () => void
}

const SetupActionModalTemplate: React.FC<Props> = ({
  width = '440px',
  open,
  action,
  validate,
  onClose,
  onSubmit,
  children,
  noTitle,
}): JSX.Element => {
  const theme: any = useTheme()
  // @ts-expect-error
  const Icon = ProposalActionConfig[action.group as keyof typeof ProposalActionConfig].items[action.text].icon
  const description =
    // @ts-expect-error
    ProposalActionConfig[action.group as keyof typeof ProposalActionConfig].items[action.text].description

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <FlexBox $direction='column' $gap={8} width={width}>
        <FlexBox $alignItems='center' $gap={4}>
          <SvgBox color={theme.ixoBlack} $svgWidth={8} $svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {!noTitle && action.text}
          </Typography>
        </FlexBox>

        <BodyWrapper width='100%' $direction='column' $gap={4}>
          {description && (
            <Typography weight='medium' size='md'>
              {description}
            </Typography>
          )}
          {children}
        </BodyWrapper>

        {onSubmit && (
          <FlexBox width='100%'>
            <Button variant='primary' onClick={onSubmit} disabled={!validate} style={{ width: '100%' }}>
              Confirm
            </Button>
          </FlexBox>
        )}
      </FlexBox>
    </Modal>
  )
}

export default SetupActionModalTemplate
