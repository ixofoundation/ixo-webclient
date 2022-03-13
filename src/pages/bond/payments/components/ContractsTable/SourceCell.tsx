import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import MultipleRecipientsModal from 'common/components/ControlPanel/Actions/MultipleRecipientsModal'

const StyledSourceContainer = styled.div`
  // background: #143f54;
  // padding-left: 2em;
  position: relative;
  cursor: pointer;
  span {
    line-height: 120%;
  }
`

const SourceCell: FunctionComponent<any> = ({ value }) => {
  const [
    multipleRecipientsModalOpen,
    setMultipleRecipientsModalOpen,
  ] = useState(false)
  return (
    <>
      <StyledSourceContainer
        onClick={(): void => setMultipleRecipientsModalOpen(true)}
      >
        <span>
          {value.length > 1 ? 'Multiple Recipients' : value[0].address}
        </span>
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
