import { Box, Flex, rem } from '@mantine/core'
import KeyValueTable from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { SvgBox } from 'components/App/App.styles'
import { useQuery } from 'hooks/window'
import ClaimForm from '../ClaimForm'

const Claims = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { claim } = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')

  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const linkedResourceColumns: Column[] = [
    {
      title: '',
      render: (row: any) => (
        <SvgBox $svgWidth={8} $svgHeight={8} color={primaryColor}>
          <ClaimIcon />
        </SvgBox>
      ),
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Title',
      render: (row: any) => row.template?.title,
    },
    {
      title: 'Description',
      render: (row: any) => row.template?.description,
    },
  ]

  if (claimId && claim) {
    return <ClaimForm claimId={claimId} />
  }

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <KeyValueTable
          valueType={'claim'}
          columns={linkedResourceColumns}
          data={Object.values(claim ?? {})}
          themeColor={primaryColor}
        />
      </Box>
    </Flex>
  )
}

export default Claims
