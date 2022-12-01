import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import MultipleRecipientsModal from 'components/ControlPanel/Actions/MultipleRecipientsModal'

const StyledSourceContainer = styled.div`
  // background: #143f54;
  // padding-left: 2em;
  position: relative;
  cursor: pointer;
  span {
    line-height: 120%;
  }
`

const TextWrapper = styled.span`
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`

const SourceCell: FunctionComponent<any> = ({ value }) => {
  const [multipleRecipientsModalOpen, setMultipleRecipientsModalOpen] = useState(false)
  return (
    <>
      <StyledSourceContainer onClick={(): void => setMultipleRecipientsModalOpen(true)}>
        <TextWrapper>{value.length > 1 ? 'Multiple Recipients' : value[0].address}</TextWrapper>
      </StyledSourceContainer>

      <ModalWrapper
        isModalOpen={multipleRecipientsModalOpen}
        header={{
          title: 'Multiple Recipients',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setMultipleRecipientsModalOpen(false)}
      >
        <MultipleRecipientsModal recipients={value} />
      </ModalWrapper>
    </>
  )
}

export default SourceCell
