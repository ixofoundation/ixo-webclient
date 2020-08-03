import React from 'react'
import { SwitchWrapper } from './Switch.styles'

interface Props {
  label: string
  on: boolean
  handleChange(): void
}

export const Switch: React.SFC<Props> = ({ label, on, handleChange }) => {
  return (
    <>
      <SwitchWrapper aria-label={label}>
        {label}
        <div className={`switch ${on ? 'active' : ''}`} onClick={handleChange}>
          <div className="switch-handle"></div>
        </div>
      </SwitchWrapper>
    </>
  )
}
