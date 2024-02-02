import { useIxoConfigs } from 'hooks/configs'
import { Dropdown } from 'pages/CreateEntity/Components'
import React from 'react'

interface Props {
  denom: string
  onChange: (value: string) => void
}

const TokenSelector: React.FC<Props> = ({ denom, onChange }): JSX.Element => {
  const { getAssetPairs } = useIxoConfigs()
  const assetPairs = getAssetPairs()

  return (
    <Dropdown
      name={'token'}
      value={denom}
      options={assetPairs.map((asset) => ({ value: asset.display, text: `$${asset.display.toUpperCase()}` }))}
      $hasArrow={false}
      onChange={(e) => onChange(e.target.value)}
      style={{ textAlign: 'center' }}
    />
  )
}

export default TokenSelector
