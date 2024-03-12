import React from 'react'
import { Card } from 'pages/CurrentEntity/Components'
import { Message } from 'generated/graphql'
import { AssetEventsTable } from './AssetEventsTable'

interface Props {
  label: string
  icon: JSX.Element
  messages: Message[]
}
const AssetEventsCard: React.FC<Props> = ({ label, icon, messages }) => {
  return (
    <Card label={label} icon={icon}>
      <AssetEventsTable events={messages as Message[]} />
    </Card>
  )
}

export default AssetEventsCard
