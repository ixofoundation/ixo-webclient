import React from 'react'
import { Card } from '../Components'
import { FlexBox } from 'components/App/App.styles'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'

interface Props {
  tbd?: any
}

const GovernanceActivity: React.FC<Props> = (): JSX.Element => {
  return (
    <Card icon={<PieIcon />} label='Governance activity'>
      <FlexBox width='100%'>Charts</FlexBox>
    </Card>
  )
}

export default GovernanceActivity
