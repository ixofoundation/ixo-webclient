import React from 'react'
import { Card } from 'pages/CurrentEntity/Components'
import { Text } from '@mantine/core'

interface Props {
  label: string
  icon: JSX.Element
}
const ClaimActivityCard: React.FC<Props> = ({ label, icon }) => {
  return (
    <Card label={label} icon={icon}>
      <Text>Coming Soon</Text>
    </Card>
  )
}

export default ClaimActivityCard
