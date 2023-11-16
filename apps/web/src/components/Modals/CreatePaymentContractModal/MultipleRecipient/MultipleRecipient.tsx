import QRCodeIcon from 'assets/images/icon-qrcode.svg'
import ModalInput from 'components/Modal/ModalInput/ModalInput'
import { isFloat } from 'utils/validation'
import { checkValidAddress } from 'redux/account/account.utils'
import { RecipientWrapper } from './MultipleRecipient.styles'
import { DistributionShare } from '@ixo/impactxclient-sdk/types/codegen/ixo/payments/v1/payments'

interface Props {
  recipients?: DistributionShare[]
  updateRecipients?: (recipient: DistributionShare, index: number) => void
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
            preIcon={QRCodeIcon}
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
