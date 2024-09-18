interface Props {
  value: string
  placeholder: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
  uiSchema?: any
}

const AffixText: React.FunctionComponent<Props> = (props: Props) => {
  const { value, placeholder, onChange, onBlur, onFocus, uiSchema } = props
  const prefix = uiSchema['ui:prefix']
  const suffix = uiSchema['ui:suffix']

  return (
    <div className='affix-text-wrapper form-control d-flex p-0'>
      {prefix && <span className='affix d-flex align-items-center px-2 font-weight-bold'>{prefix}</span>}
      <input
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        onBlur={(): void => onBlur(value)}
        onFocus={(): void => onFocus(value)}
        placeholder={placeholder}
        className='w-100 m-0'
      />
      {suffix && <span className='affix d-flex align-items-center px-2 font-weight-bold'>{suffix}</span>}
    </div>
  )
}

export default AffixText
