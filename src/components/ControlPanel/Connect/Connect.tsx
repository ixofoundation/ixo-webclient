import React from 'react'
import { Card } from '../Card'
import { Widget } from '../types'
import { ReactComponent as ShareIcon } from 'assets/images/icon-share-alt-square-solid.svg'
import { ReactSVG } from 'react-svg'
import { requireCheckDefault } from 'utils/images'

interface Props {
  widget: Widget
}

const ConnectCard: React.FC<Props> = ({ widget }) => {
  return (
    <Card
      icon={<ShareIcon />}
      title='Connect'
      columns={2}
      items={(widget?.controls ?? [])
        .filter((control) => control[`@type`] === 'External')
        .filter((control) => {
          try {
            require(`../../../${control.icon}`)
            return true
          } catch {
            return false
          }
        })
        .map((control) => ({
          icon: <ReactSVG src={requireCheckDefault(require(`../../../${control.icon}`))} />,
          content: control.title,
          onClick: () => {
            window.open(control.endpoint)
          },
        }))}
    />
  )
}

export default ConnectCard
