import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { ImageUploadModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { SvgBox } from 'components/CoreEntry/App.styles'

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

const ImageUpload: React.FC<Props> = ({ value, onChange }): JSX.Element => {
  const theme: any = useTheme()
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Wrapper background={value} onClick={(): void => setOpenModal(true)}>
        {!value ? (
          <>
            <SvgBox color={theme.ixoNewBlue}>
              <img src='/assets/images/icon-image-fill.svg' />
            </SvgBox>
            <Typography color='blue' size='xl'>
              Upload an Image
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
      <ImageUploadModal
        aspect={16 / 9}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={value || ''}
        handleChange={onChange}
      />
    </>
  )
}

export default ImageUpload
