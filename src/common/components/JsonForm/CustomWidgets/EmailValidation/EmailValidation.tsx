import EmailVerification from '../../../Verification/EmailVerification/EmailVerification'

interface Props {
  value: string
  onChange: (value: string) => void
}

const EmailValidation: React.FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <EmailVerification
      to={value}
      handleCompleted={(email): void => onChange(email)}
      handleReset={(): void => onChange('')}
    />
  )
}

export default EmailValidation
