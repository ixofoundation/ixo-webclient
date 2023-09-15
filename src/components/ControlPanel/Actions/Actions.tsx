import React from 'react'
import { Card } from '../Card'
import { Widget } from '../types'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

interface Props {
  widget: Widget
}

const Actions: React.FC<Props> = () => {
  return (
    <Card
      icon={<AssistantIcon />}
      title='Actions'
      columns={2}
      items={[
        {
          icon: <PlusIcon />,
          content: 'Apply to join',
          onClick: () => {
            console.log('TODO: apply to join')
          },
        },
      ]}
    />
  )
}

export default Actions
