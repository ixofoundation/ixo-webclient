import React from 'react'

const selectValue = (value: string, selected, all): any[] => {
  const at = all.indexOf(value)
  const updated = selected.slice(0, at).concat(value, selected.slice(at))

  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b))
}

const deselectValue = (value: string, selected): any[] => {
  return selected.filter(v => v !== value)
}

interface Props {
  id: string
  disabled: boolean
  options: any
  value: string
  autofocus: boolean
  readonly: boolean
  onChange: (value: any) => void
}

const CheckboxesWidget: React.FunctionComponent<Props> = ({
  id,
  disabled,
  options: { enumOptions, enumDisabled, inline },
  value,
  autofocus,
  readonly,
  onChange,
}) => {
  return (
    <div className="checkboxes" id={id}>
      {enumOptions.map((option, index) => {
        const checked = value.indexOf(option.value) !== -1
        const itemDisabled =
          enumDisabled && enumDisabled.indexOf(option.value) != -1
        const disabledCls =
          disabled || itemDisabled || readonly ? 'disabled' : ''
        const checkbox = (
          <span>
            <input
              type="checkbox"
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={(event: any): void => {
                const all = enumOptions.map(({ value }) => value)
                if (event.target.checked) {
                  onChange(selectValue(option.value, value, all))
                } else {
                  onChange(deselectValue(option.value, value))
                }
              }}
            />
            <span>{option.label}</span>
          </span>
        )
        return inline ? (
          <label key={index} className={`checkbox-inline ${disabledCls}`}>
            {checkbox}
          </label>
        ) : (
          <div key={index} className={`checkbox ${disabledCls}`}>
            <label>{checkbox}</label>
          </div>
        )
      })}
    </div>
  )
}

export default CheckboxesWidget
