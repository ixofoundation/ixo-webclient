import ModalTextArea from 'common/components/ModalTextArea/ModalTextArea'
import React from 'react'
import { Container } from './Modal.styles'

interface Props {
  recipients: any[]
}

const MultipleRecipientsModal: React.FunctionComponent<Props> = ({ recipients }) => {
  return (
    <Container>
      <div className='mt-3' />
      <ModalTextArea
        value={recipients
          .map((item) => `${String(parseFloat(item.percentage)).padStart(2, '0')}%   ${item.address}`)
          .join('\n')}
        rows={10}
        cols={30}
        disable={true}
      />
    </Container>
  )
}

export default MultipleRecipientsModal
