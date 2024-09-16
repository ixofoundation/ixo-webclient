import React, { useState } from 'react'
import styled from 'styled-components'
import { ImageUploadModal } from 'components/Modals'
import { Typography } from 'components/Typography'

const Wrapper = styled.div<{ size: number; background?: string }>`
  ${(props): string =>
    props.background
      ? `background: url(${props.background}) center center no-repeat;`
      : `background: ${props.theme.ixoNewBlue};`}
  background-size: contain;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  text-align: center;

  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};

  &:hover {
    opacity: 0.8;
  }
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

interface Props {
  icon: string | undefined
  sizeInPX?: number
  placeholder?: string
  handleChange: (value: string) => void
  allowEdit?: boolean
}

const IconUpload: React.FC<Props> = ({
  icon,
  sizeInPX = 60,
  placeholder = 'Icon',
  handleChange,
  allowEdit = true,
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    if (allowEdit) {
      setOpenModal(true)
    }
  }
  return (
    <>
      <Wrapper size={sizeInPX} background={icon} onClick={handleClick}>
        {!icon ? (
          <Typography weight='semi-bold' size='md' color='white'>
            {placeholder}
          </Typography>
        ) : (
          allowEdit && (
            <Overlay>
              <Typography weight='semi-bold' size='md' color='white'>
                Replace
              </Typography>
            </Overlay>
          )
        )}
      </Wrapper>
      <ImageUploadModal
        aspect={1}
        circularCrop={true}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={icon || ''}
        handleChange={handleChange}
      />
    </>
  )
}

export default IconUpload
