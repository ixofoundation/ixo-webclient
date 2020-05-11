import React from 'react'
import { ShieldSettings } from '../../types'

interface Props {
  entityDid: string
  shieldSettings: ShieldSettings
}

const Shield: React.FunctionComponent<Props> = ({
  entityDid,
  shieldSettings,
}) => {
  const shieldUrl = encodeURIComponent(
    `${process.env.REACT_APP_BLOCK_SYNC_URL}/api/project/shields/${shieldSettings.field}/${entityDid}`,
  )
  return (
    <img
      key={shieldSettings.field}
      src={`https://img.shields.io/endpoint?url=${shieldUrl}`}
    />
  )
}

export default Shield
