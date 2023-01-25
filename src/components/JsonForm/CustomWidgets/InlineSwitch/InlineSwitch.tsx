import { InlineSwitchWrapper } from './InlineSwitch.styles'

const InlineSwitch: React.FC = (props: any) => {
  const label = props.schema.label
  const { disabled } = props

  return (
    <>
      <label className='invisible'>{label}</label>
      <InlineSwitchWrapper aria-label={props.label} className={props.className}>
        <span>{label}</span>
        <div
          className={`switch ${props.value ? 'active' : ''}`}
          onClick={(): void => {
            !disabled && props.onChange(!props.value)
          }}
        >
          <div className='switch-handle'></div>
        </div>
      </InlineSwitchWrapper>
    </>
  )
}

export default InlineSwitch
