import React from 'react'

interface Props {
  options: any
  value: string
  placeholder: string
  onChange: (value: any) => void
}

const TextArea: React.FunctionComponent<Props> = ({
  options: { maxLength },
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      className="form-control"
      maxLength={maxLength}
      value={value}
      onChange={(e): void => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default TextArea
