import { Flex, Text } from '@mantine/core'
import ClaimIcon from 'assets/images/icon-claim.svg'
import { SvgBox } from 'components/App/App.styles'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import ApplicationSubmissionCard from './ApplicationSubmissionCard'
import ClaimActions from './ClaimActions'
import WithdrawEarningsCard from './WithdrawEarningsCard'
import { useIsEntityOwner } from 'hooks/claim'
import { useParams } from 'react-router-dom'

const ClaimPanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
   const { entityId = '' } = useParams<{ entityId: string }>()

  const isEntityOwner = useIsEntityOwner({
   collectionId:data?.collection?.id ,
   entityId,
 })
  return (
    <Flex style={{ borderRadius: 12 }} direction={'column'}>
      <Flex align={'center'}>
        <SvgBox $svgWidth={5} $svgHeight={5} color={primaryColor}>
          <ClaimIcon />
        </SvgBox>
        <Text ml={10} fw='bold'>
          {data.profile?.name}
        </Text>
      </Flex>
      <ApplicationSubmissionCard data={data} />
      {isEntityOwner && <ClaimActions />}
      <WithdrawEarningsCard data={data} />
    </Flex>
  )
}

export default ClaimPanel
