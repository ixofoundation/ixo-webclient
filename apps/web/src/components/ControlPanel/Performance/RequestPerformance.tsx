import React from 'react'
import { Card } from '../Card'

import ClockIcon from 'assets/images/icon-clock-2.svg'
import { IconCode, IconCoins, IconHourglassEmpty } from '@tabler/icons-react'
import DaoIcon from 'assets/icons/DaoIcon'
import { rem } from '@mantine/core'

const RequestPerfomance: React.FC = () => {
  const iconStyle = { width: rem(18), height: rem(18) }
  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={2}
      items={[
        {
          icon: <IconCoins style={iconStyle} />,
          withoutSvgBox: true,
          content: `10000 IXO`,
        },
        {
          icon: <IconCode style={iconStyle} />,
          withoutSvgBox: true,
          content: `Development`,
        },
        {
          icon: <DaoIcon />,
          content: 'ImpactsDAO', // TODO: number of Projects?
        },
        {
          icon: <IconHourglassEmpty style={iconStyle} />,
          withoutSvgBox: true,
          content: '61 days to go',
        },
      ]}
    />
  )
}

export default RequestPerfomance
