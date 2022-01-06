import React from 'react'
import { Switch as DefaultSwitch } from 'common/components/Switch/Switch'

interface Props {
  // id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

const Switch: React.FunctionComponent<any> = (props) => {
  console.log(1111, props)
  const handleChange = (): void => {
    props.onChange(!props.value)
  }
  return (
    <>
      <DefaultSwitch
        label={props.schema.label}
        on={props.value}
        className="justify-content-end flex-row-reverse"
        handleChange={handleChange}
      />
    </>
  )
}

export default Switch
