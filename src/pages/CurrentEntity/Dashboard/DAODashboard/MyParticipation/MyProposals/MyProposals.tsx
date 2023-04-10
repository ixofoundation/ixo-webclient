import { FlexBox, theme } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import ProgressBar from 'components/Widgets/ProgressBar/ProgressBar'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { votingRemainingDateFormat } from 'utils/formatters'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }

    tbody > tr {
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const renderTableHeader = (name: string, justifyContent = 'flex-start') => (
  <FlexBox
    p={4}
    justifyContent={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </FlexBox>
)

interface Props {
  coreAddress: string
  full?: boolean
}

const MyProposals: React.FC<Props> = ({ coreAddress, full = true }) => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { myProposals, numOfMembers } = useCurrentDaoGroup(coreAddress)

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Name'),
        accessor: 'name',
        renderCell: (cell: any) => {
          const id = cell.row.original?.id
          const title = cell.row.original?.proposal.title

          return (
            <FlexBox p={4}>
              <Typography size='lg'>
                #{id} {title}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Value', 'flex-end'),
        accessor: 'value',
        renderCell: (cell: any) => {
          const votes = cell.row.original?.proposal.votes
          const status = cell.row.original?.proposal.status
          const closeDate = cell.row.original?.proposal.closeDate
          const remainingTime = closeDate - new Date().getTime()
          const data = [
            { key: 'yes', value: Number(votes.yes), color: theme.ixoGreen },
            { key: 'no', value: Number(votes.no), color: theme.ixoRed },
            { key: 'abstain', value: Number(votes.abstain), color: theme.ixoOrange },
          ]

          const statusColorMap = {
            open: 'white',
            rejected: 'red',
            passed: 'green',
          }
          return (
            <FlexBox p={4} minWidth='200px'>
              <FlexBox position='relative' width='100%'>
                <ProgressBar data={data} totalValue={numOfMembers} />
                <FlexBox position='absolute' bottom='-16px' width='100%' justifyContent='space-between'>
                  <Typography size='sm' color={statusColorMap[status]}>
                    {status}
                  </Typography>
                  <Typography size='sm' color='dark-blue'>
                    {remainingTime > 0 ? `${votingRemainingDateFormat(remainingTime)} remaining` : `closed`}
                  </Typography>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          )
        },
      },
    ],
    [numOfMembers],
  )

  const handleNewProposal = () => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info`)
  }

  const handleRowClick = (state: any) => () => {
    const { original } = state
    const { proposal } = original
    const { description } = proposal
    const [, deedDid] = description.split('#deed:')

    if (deedDid) {
      history.push(`/entity/${deedDid}/overview`)
    }
  }

  return (
    <>
      <FlexBox width='100%' direction='column' gap={3}>
        <TableWrapper>
          <Table
            columns={columns}
            data={myProposals}
            getRowProps={(state) => ({
              style: { height: 70, cursor: 'pointer' },
              onClick: handleRowClick(state),
            })}
            getCellProps={() => ({ style: { background: '#023044' } })}
          />
        </TableWrapper>
      </FlexBox>
      <Button
        variant='secondary'
        onClick={handleNewProposal}
        size='flex'
        height={40}
        textSize='base'
        textTransform='capitalize'
        textWeight='medium'
      >
        New Proposal
      </Button>
    </>
  )
}

export default MyProposals
