import React from 'react'
import { MapImage } from 'components'
import { Card } from 'screens/CurrentEntity/Components'
import { Flex } from '@mantine/core'

interface Props {
  label: string
  icon: JSX.Element
  cookStove?: any
}
const AssetLocationCard: React.FC<Props> = ({ label, icon, cookStove }) => {
  return (
    <Card label={label} icon={icon}>
      <Flex pos={'relative'} w={'100%'} h={'100%'}>
        <MapImage longitude={cookStove?.longitude} latitude={cookStove?.latitude} />
      </Flex>
    </Card>
  )
}

export default AssetLocationCard
