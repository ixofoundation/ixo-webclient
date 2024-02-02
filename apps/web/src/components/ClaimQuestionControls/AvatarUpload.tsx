import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as IconImage } from 'assets/images/icon-image-fill.svg'
import { ImageUploadModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { SvgBox } from 'components/App/App.styles'
import { ReactComponent as TrashIcon } from 'assets/images/icon-trash.svg'

const Wrapper = styled.div<{ background?: string }>`
  background: ${(props) => (props.background ? `url(${props.background}) center center no-repeat` : `transparent`)};
  background-size: cover;

  border: 1px solid ${(props) => (props.background ? 'transparent' : props.theme.ixoNewBlue)};
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  width: 100px;
  height: 100px;

  position: relative;

  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`

interface Props {
  value: string
  onChange: (value: string) => void
}

const AvatarUpload: React.FC<Props> = ({ value, onChange }): JSX.Element => {
  const theme: any = useTheme()
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Wrapper background={value} onClick={(): void => setOpenModal(true)}>
        {!value ? (
          <>
            <SvgBox color={theme.ixoNewBlue} mb={2} $svgWidth={6} $svgHeight={6}>
              <IconImage />
            </SvgBox>
            <Typography color='blue' size='md'>
              Upload an Avatar
            </Typography>
          </>
        ) : (
          <SvgBox
            position='absolute'
            top='0px'
            right='0px'
            onClick={(e) => {
              onChange('')
              e.stopPropagation()
            }}
          >
            <TrashIcon />
          </SvgBox>
        )}
      </Wrapper>
      <ImageUploadModal
        aspect={1}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={value || ''}
        handleChange={onChange}
        circularCrop
      />
    </>
  )
}

export default AvatarUpload
