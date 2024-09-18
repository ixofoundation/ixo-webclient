import { SwitchWrapper } from './Switch.styles'

interface Props {
  label: string
  on: boolean
  className?: string
  handleChange(): void
}

export const Switch: React.FC<Props> = ({ label, on, className = '', handleChange }) => {
  return (
    <>
      <SwitchWrapper aria-label={label} className={className}>
        <span>{label}</span>
        <div className={`switch ${on ? 'active' : ''}`} onClick={handleChange}>
          <div className='switch-handle'></div>
        </div>
      </SwitchWrapper>
    </>
  )
}
