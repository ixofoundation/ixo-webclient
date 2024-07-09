import { Badge, Flex, Skeleton, Text, rem } from '@mantine/core'
import KeyValueTable from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { SvgBox } from 'components/App/App.styles'
import { useMemo } from 'react'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { timeAgo } from 'utils/time'
import { useGetIid } from 'graphql/iid'
import { LiaUserCircleSolid } from 'react-icons/lia'
import { isDevelopment } from 'constants/common'

const getClaimsMetric = (claims: any[]) => {
  const totalClaims = Number(claims.length ?? 0)
  const totalApproved = Number(
    claims.reduce((acc, claim) => {
      if (claim.evaluationByClaimId?.status === 1) {
        return acc + 1
      }
      return acc
    }, 0),
  )

  return `${totalApproved.toLocaleString()}/${totalClaims.toLocaleString()}`
}

const getUserRole = (userLinkedResources: any[], collectionId: string) => {
  const claim = userLinkedResources?.find(
    (v) =>
      v.id === `{id}#offer#${collectionId}` && v.type === 'DeedOffer' && v.description.split('#')[0] === collectionId,
  )

  const role = claim?.description.split('#')[1]
  return role
}

const RoleBadge = ({ role }: { role: 'SA' | 'EA' | 'IA' | 'RA' | 'PA' }) => {
  const roleMap = {
    SA: 'Agent',
    EA: 'Evaluator',
    IA: 'Implementation Agent',
    RA: 'Review Agent',
    PA: 'Payment Agent',
  }

  return (
    <Badge c='black' size='lg' autoContrast leftSection={<LiaUserCircleSolid fill='black' size={20} />}>
      {roleMap[role]}
    </Badge>
  )
}

const DEV_COLUMNS = isDevelopment ? [{ title: 'ID', render: (row: any) => row.collection.id }] : []

const ClaimTable = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { claimTableData, loading } = useClaimTableData({ entityId })
  const { wallet } = useWallet()
  const { data: iid } = useGetIid(wallet?.did ?? '')

  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const linkedResourceColumns: Column[] = useMemo(() => {
    const authColumns: Column[] = [
      {
        title: '',
        render: () => (
          <SvgBox $svgWidth={8} $svgHeight={8} color={primaryColor}>
            <ClaimIcon />
          </SvgBox>
        ),
        style: { style: { width: rem(30) } },
      },
      {
        title: 'Name',
        render: (row: any) => row?.profile?.name,
      },
      {
        title: 'Total Claims',
        render: (row) =>
          `${(row?.collection?.count as number).toLocaleString()}/${(row?.collection?.quota as number).toLocaleString()}`,
      },
      {
        title: 'Role',
        render: (row) => {
          const role = getUserRole(iid?.linkedResource, row.collection.id)
          return role ? (
            <RoleBadge role={role} />
          ) : (
            <Text c='dimmed' size="sm">No Role</Text>
          )
        }
      },
      {
        title: 'Claims',
        render: (row) =>
          row.lastClaim ? (
            `${getClaimsMetric(row?.collection?.claimsByCollectionId?.nodes)}`
          ) : (
            <Text c='dimmed' size="sm">No Claims Submitted</Text>
          ),
      },
      {
        title: 'Last Claim',
        render: (row) =>
          row.lastClaim ? (
            timeAgo.format(new Date(row.lastClaim.submissionDate))
          ) : (
            <Text c='dimmed' size="sm">No Claims Submitted</Text>
          ),
      },
    ]

    const unAuthColumns: Column[] = [
      {
        title: '',
        render: () => (
          <SvgBox $svgWidth={8} $svgHeight={8} color={primaryColor}>
            <ClaimIcon />
          </SvgBox>
        ),
        style: { style: { width: rem(30) } },
      },
      {
        title: 'Name',
        render: (row: any) => row.profile?.name,
      },
      {
        title: 'Total Claims',
        render: (row) =>
          `${(row?.collection?.count as number).toLocaleString()}/${(row?.collection?.quota as number).toLocaleString()}`,
      },
    ]

    return DEV_COLUMNS.concat(wallet ? authColumns : unAuthColumns)
  }, [wallet, primaryColor, iid?.linkedResource])

  if (loading) {
    return (
      <Flex w={'100%'} h='100%' gap={10} direction={'column'} mt={20}>
        <Skeleton w='100%' height={50} />
        <Skeleton w='100%' height={50} />
        <Skeleton w='100%' height={50} />
        <Skeleton w='100%' height={50} />
        <Skeleton w='100%' height={50} />
      </Flex>
    )
  }

  return (
    <KeyValueTable
      valueType={'claim'}
      columns={linkedResourceColumns}
      data={claimTableData}
      themeColor={primaryColor}
      primaryId={'collection.id'}
    />
  )
}

export default ClaimTable
