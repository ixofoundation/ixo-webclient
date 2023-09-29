import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as FireIcon } from 'assets/images/icon-fire.svg'

const AssetPerformance: React.FC = () => {
  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <FireIcon />,
          content: `${(1200).toLocaleString()} kg CO2 emissions avoided`,
        },
      ]}
    />
  )
}

export default AssetPerformance
