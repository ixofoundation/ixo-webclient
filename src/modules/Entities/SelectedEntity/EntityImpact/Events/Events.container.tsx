import React, { FunctionComponent } from 'react'
import {
  Table,
  Button,
  SectionTitleContainer,
  SectionTitle,
} from 'common/components/Dashboard'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import * as entitySelectors from '../../SelectedEntity.selectors'

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'EVENT TYPE',
    accessor: 'type',
  },
  {
    Header: 'MESSAGE',
    accessor: 'message',
  },
]

const tableData = [
  {
    date: new Date(2020, 6, 6),
    type: 'Result',
    message:
      'The Relayer candidate has been successful!  Withdraw your stake and reward.',
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Announcement',
    message: 'This campaign has now ended. Withdraw your voting stake..',
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Announcement',
    message: 'This campaign ends in 24 hours.',
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Status Update',
    message: 'Voting is now open for 21 days.',
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Status Update',
    message:
      'Vote for the Yoma Relayer to be selected. 300,000 Votes are required.',
  },
  {
    date: new Date(2020, 6, 6),
    type: 'Status Update',
    message:
      'Vote for the Yoma Relayer to be selected. 300,000 Votes are required.',
  },
]

interface Props {
  entityType?: string
}

const Events: FunctionComponent<Props> = ({ entityType }) => {
  return (
    <div>
      <SectionTitleContainer>
        <SectionTitle>{entityType} Events</SectionTitle>
        <Button>Submit a Claim</Button>
      </SectionTitleContainer>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entityType: entitySelectors.selectEntityType(state),
})

const mapDispatchToProps = (dispatch): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Events)
