import { FlexBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import ProgressBar from 'components/Widgets/ProgressBar/ProgressBar'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
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
  show?: boolean
  coreAddress: string
  userAddress?: string
  full?: boolean
}

const UserProposals: React.FC<Props> = ({ show, coreAddress, userAddress, full = true }) => {
  const theme: any = useTheme()
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { address } = useAccount()
  const { isImpactsDAO, isMemberOfImpactsDAO } = useCurrentEntity()
  const { daoGroup, proposals, numOfMembers } = useCurrentEntityDAOGroup(coreAddress)

  const isParticipating = useMemo(() => {
    return daoGroup.votingModule.members.some(({ addr }) => addr === (userAddress || address))
  }, [daoGroup, address, userAddress])

  const userProposals = useMemo(() => {
    const userProposals = proposals.filter(({ proposal }: any) => proposal.proposer === (userAddress || address))
    return userProposals
  }, [proposals, address, userAddress])

  const sortedUserProposals = userProposals.sort((a, b) => {
    if (a.id < b.id) {
      return 1
    } else if (a.id > b.id) {
      return -1
    }
    return 0
  })

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
            { key: 'yes', value: Number(votes?.yes || '0'), color: theme.ixoGreen },
            { key: 'no', value: Number(votes?.no || '0'), color: theme.ixoRed },
            { key: 'abstain', value: Number(votes?.abstain || '0'), color: theme.ixoOrange },
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
    [numOfMembers, theme],
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

  if (!show) {
    return null
  }

  if (isImpactsDAO && !isMemberOfImpactsDAO) {
    return (
      <FlexBox height='100%' direction='column' justifyContent='space-between'>
        <Typography variant='secondary' size='2xl' color='dark-blue'>
          ImpactsDAO is a DAO cooperative. If you are a delegate of a DAO and want it to become a member, stake LVC
          tokens and submit a joining proposal.
        </Typography>
        <Button
          variant='secondary'
          size='flex'
          width={170}
          height={40}
          textSize='base'
          textTransform='capitalize'
          textWeight='medium'
          disabled={!isParticipating}
        >
          Join
        </Button>
      </FlexBox>
    )
  }

  return (
    <>
      {sortedUserProposals.length > 0 ? (
        <FlexBox width='100%' direction='column' gap={3}>
          <TableWrapper>
            <Table
              columns={columns}
              data={full ? sortedUserProposals : sortedUserProposals.slice(0, 2)}
              getRowProps={(state) => ({
                style: { height: 70, cursor: 'pointer' },
                onClick: handleRowClick(state),
              })}
              getCellProps={() => ({ style: { background: '#023044' } })}
            />
          </TableWrapper>
        </FlexBox>
      ) : (
        <Typography variant='secondary' size='2xl' color='dark-blue'>
          No proposals.
        </Typography>
      )}
      {!userAddress && (
        <Button
          variant='secondary'
          onClick={handleNewProposal}
          size='flex'
          width={170}
          height={40}
          textSize='base'
          textTransform='capitalize'
          textWeight='medium'
          disabled={!isParticipating}
        >
          New Proposal
        </Button>
      )}
    </>
  )
}

export default UserProposals
