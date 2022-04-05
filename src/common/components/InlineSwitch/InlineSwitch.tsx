import React from 'react'
import { InlineSwitchWrapper } from './InlineSwitch.styles'

export const InlineSwitch: React.SFC = (props: any) => {
  const label = props.schema.label
  return (
    <InlineSwitchWrapper aria-label={props.label} className={props.className}>
      <span>{label}</span>
      <div
        className={`switch ${props.value ? 'active' : ''}`}
        onClick={(): void => {
          props.onChange(!props.value)
        }}
      >
        <div className="switch-handle"></div>
      </div>
    </InlineSwitchWrapper>
  )
}
