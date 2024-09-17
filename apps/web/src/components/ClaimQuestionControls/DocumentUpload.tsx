import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { LinkedResourceSetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { SvgBox } from 'components/CoreEntry/App.styles'

import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { ixo } from '@ixo/impactxclient-sdk'

const Wrapper = styled.div<{ background?: string }>`
  background: ${(props) => (props.background ? `url(${props.background}) center center no-repeat` : `transparent`)};
  background-size: cover;

  border: 1px solid ${(props) => (props.background ? 'transparent' : props.theme.ixoNewBlue)};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  width: 400px;
  height: 240px;

  position: relative;

  &:hover {
    opacity: 0.8;
  }
`

interface Props {
  value: string
  onChange: (value: string) => void
}

const DocumentUpload: React.FC<Props> = ({ value, onChange }): JSX.Element => {
  const theme: any = useTheme()
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Wrapper onClick={(): void => setOpenModal(true)}>
        {!value ? (
          <>
            <SvgBox className='mb-3' color={theme.ixoNewBlue}>
              <img src='/assets/images/icon-document.svg' />
            </SvgBox>
            <Typography color='blue' size='xl'>
              Upload a Document
            </Typography>
          </>
        ) : (
          <SvgBox
            position='absolute'
            top='16px'
            right='16px'
            onClick={(e) => {
              onChange('')
              e.stopPropagation()
            }}
          >
            <img src='/assets/images/icon-trash.svg' />
          </SvgBox>
        )}
      </Wrapper>
      <LinkedResourceSetupModal
        linkedResource={ixo.iid.v1beta1.LinkedResource.fromPartial({
          type: 'document',
        })}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        onChange={(linkedResource: LinkedResource): void => onChange(linkedResource.serviceEndpoint)}
      />
    </>
  )
}

export default DocumentUpload
