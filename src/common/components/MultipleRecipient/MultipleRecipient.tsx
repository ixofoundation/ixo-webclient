import QRCodeRedIcon from 'assets/images/modal/qrcode-red.svg'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import ModalInput from 'common/components/ModalInput/ModalInput'
import { isFloat } from 'common/utils/validationUtils'
import { checkValidAddress } from 'redux/account/account.utils'
import { RecipientWrapper } from './MultipleRecipient.styles'
import { Recipient } from './types'

interface Props {
  recipients?: Recipient[]
  updateRecipients?: (recipient: Recipient, index: number) => void
  addRecipient?: () => void
  removeRecipient?: (index: number) => void
}

const MultipleRecipient: React.FunctionComponent<Props> = ({
  recipients = [],
  updateRecipients,
  addRecipient,
  removeRecipient,
}) => {
  return (
    <div className='d-flex flex-column align-items-center mb-3'>
      {recipients.map((recipient, index) => (
        <RecipientWrapper key={index.toString()}>
          <ModalInput
            preIcon={
              recipient.address === undefined || checkValidAddress(recipient.address) ? QRCodeIcon : QRCodeRedIcon
            }
            placeholder='Recipient Account'
            invalid={recipient.address !== undefined && !checkValidAddress(recipient.address)}
            value={recipient.address}
            handleChange={(e): void => {
              updateRecipients!({ ...recipient, address: e.target.value }, index)
            }}
            hideLabel={true}
          />
          <ModalInput
            invalid={
              recipient.percentage !== undefined &&
              (!isFloat(recipient.percentage) || parseFloat(recipient.percentage) <= 0)
            }
            placeholder='%'
            value={recipient.percentage}
            handleChange={(e): void => updateRecipients!({ ...recipient, percentage: e.target.value }, index)}
            hideLabel={true}
          />
          {index === 0 && <button onClick={addRecipient}>{'+'}</button>}
          {index !== 0 && <button onClick={(): void => removeRecipient!(index)}>{'–'}</button>}
        </RecipientWrapper>
      ))}
    </div>
  )
}

export default MultipleRecipient
