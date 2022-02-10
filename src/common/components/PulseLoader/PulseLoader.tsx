import React from 'react'
import { PulseLoaderWrapper } from './PulseLoader.styles'

interface Props {
  children: any
  repeat: boolean
}

const PulseLoader: React.SFC<Props> = ({ children, repeat }) => {
  return (
    <PulseLoaderWrapper className={`${repeat ? 'repeat' : ''}`}>
      {children}
    </PulseLoaderWrapper>
  )
}

export default PulseLoader
