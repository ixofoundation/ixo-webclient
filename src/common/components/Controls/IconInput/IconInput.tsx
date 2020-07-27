import React from 'react'

interface Props {
  value: string
  iconAssetPath: string
  placeholder: string
  onChange: (value: string) => void
}

const IconInput: React.FunctionComponent<Props> = ({
  value,
  iconAssetPath,
  placeholder,
  onChange,
}) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <img src={require(`../../../../assets${iconAssetPath}`)} height={40} />
      </div>
      <input
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  )
}

export default IconInput
