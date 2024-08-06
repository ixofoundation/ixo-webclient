import Image from 'next/image'
import { Card } from 'screens/CurrentEntity/Components'
import { OracleCard } from 'components/EntityCards/OracleCard'
import React from 'react'
import { Typography } from 'components/Typography'
import { Flex, useMantineTheme } from '@mantine/core'
import moment from 'moment'
// import ClaimLocation from './ClaimLocation'
import { withEntityData } from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
// import LatestClaims from './LatestClaims'
import EvaluatedClaims from './EvaluatedClaims'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import CountUp from 'react-countup'
import OracleClaimEvaluation from 'components/Graphs/OracleClaimEvaluation'
import { useCarbonOracleClaimAggregate } from 'hooks/oracle/useCarbonOracleClaimAggregate'
import { IconPiePiece } from 'components/IconPaths'
import { IconClock } from 'components/IconPaths'
import { IconCopy } from 'components/IconPaths'

const Overview: React.FC = () => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))

  const { minted, totalEvaluatedClaims, approvedPercentage, evaluationsData, evaluatedClaims } =
    useCarbonOracleClaimAggregate({
      entityIds: [entityId],
    })

  const model = currentEntity.profile?.attributes?.find((attr) => attr.key === 'Mechanism')?.value
  const creator = currentEntity.profile?.brand
  const startDate = currentEntity.startDate
  const endDate = currentEntity.endDate

  const oracleEntity = { ...currentEntity, metrics: { minted, totalEvaluatedClaims, approvedPercentage } }

  const renderOracleStats = () => (
    <Card icon={IconPiePiece} label='Oracle Stats'>
      <Flex align='center' gap={2}>
        <Typography size='md'>{currentEntity.id}</Typography>
        <CopyToClipboard text={currentEntity.id} onCopy={() => successToast(`Copied to clipboard`)}>
          <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
        </CopyToClipboard>
      </Flex>

      <Flex w='100%' bg={theme.colors.gray[0]} h='1px' />

      <Flex w='100%' justify='space-between'>
        <Typography size='md'>Creator</Typography>
        <Typography size='md' color='blue'>
          {creator}
        </Typography>
      </Flex>

      <Flex w='100%' justify='space-between'>
        <Typography size='md'>Created</Typography>
        <Typography size='md'>{moment(startDate as any).format('DD MMM YYYY')}</Typography>
      </Flex>

      {endDate && (
        <Flex w='100%' justify='space-between'>
          <Typography size='md'>Expires</Typography>
          <Typography size='md'>{moment(endDate as any).format('DD MMM YYYY')}</Typography>
        </Flex>
      )}

      <Flex w='100%' bg={theme.colors.gray[0]} h='1px' />

      {model && (
        <Flex w='100%' justify='space-between'>
          <Typography size='md'>Model</Typography>
          <Typography size='md'>{model}</Typography>
        </Flex>
      )}

      <Flex w='100%' justify='space-between'>
        <Typography size='md'>Claims Evaluated</Typography>
        <Typography size='md'>{totalEvaluatedClaims}</Typography>
      </Flex>

      <Flex w='100%' justify='space-between'>
        <Typography size='md'>Impact Verified</Typography>
        <Typography size='md'>
          <CountUp end={minted} duration={2} /> kg CO2
        </Typography>
      </Flex>

      <Flex w='100%' justify='space-between'>
        <Typography size='md'>CARBON generated</Typography>
        <Typography size='md'>
          <CountUp end={minted} duration={2} /> CARBON
        </Typography>
      </Flex>
    </Card>
  )

  const renderCreditsVerified = () => (
    <Card icon={IconPiePiece} label='Impact Credits Verified'>
      <Flex direction='column' align='center' justify='space-around' p={6} gap={8} w='100%' h='100%'>
        <Flex direction='column' justify='center' align='center' gap={4}>
          <Flex gap={2} align='baseline'>
            <Typography size='5xl' color='blue'>
              <CountUp end={minted} duration={2} />
            </Typography>
            <Typography size='xl' color='blue'>
              CARBON
            </Typography>
          </Flex>
          <Flex gap={2}>
            <Typography size='xl'>
              = <CountUp end={minted} duration={2} /> kg CO2 e verified
            </Typography>
          </Flex>
        </Flex>

        <Flex w='100%' gap={4}>
          <Flex direction='column' gap={2} align='center' justify='flex-end' p={4} w='100%' bg='#012131'>
            <Typography color='blue' weight='bold' size='md'>
              Evaluated Claims
            </Typography>
            <Typography weight='bold' size='md'>
              {totalEvaluatedClaims}
            </Typography>
          </Flex>
          <Flex direction='column' gap={2} align='center' p={4} w='100%' bg='#012131'>
            <Typography color='blue' weight='bold' size='md'>
              Approved
            </Typography>
            <Typography weight='bold' size='md'>
              {approvedPercentage.toFixed(2)}%
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )

  const renderClaimEvaluation = () => (
    <Card icon={IconPiePiece} label='Claim Evaluation'>
      <Flex w='100%' justify='flex-start'>
        <Flex gap={4}>
          <Flex
            style={{
              border: `1px solid ${theme.colors.blue[5]}`,
              borderRadius: '4px',
              padding: '1px 4px',
              cursor: 'pointer',
            }}
          >
            <Typography color='blue' size='md'>
              Impact Verified
            </Typography>
          </Flex>
          <Flex
            style={{
              border: `1px solid ${theme.colors.blue[5]}`,
              borderRadius: '4px',
              padding: '1px 4px',
              cursor: 'pointer',
            }}
          >
            <Typography color='blue' size='md'>
              Claims Evaluated
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <OracleClaimEvaluation evaluations={evaluationsData?.evaluations?.nodes ?? []} />
    </Card>
  )

  // const renderClaimLocations = () => (
  //   <Card icon={<Image src={IconPiePiece} alt='PiePiece' width={5} height={5} color={theme.colors.blue[5]} />} label='Claim Locations'>
  //     <ClaimLocation />
  //   </Card>
  // )

  // const renderLatestClaims = () => (
  //   <Card icon={<Image src={IconPiePiece} alt='PiePiece' width={5} height={5} color={theme.colors.blue[5]} />} label='Latest Claims'>
  //     <LatestClaims />
  //   </Card>
  // )

  const renderEvaluatedClaims = () => (
    <Card label='Evaluated Claims' icon={IconClock}>
      <EvaluatedClaims evaluatedClaims={(evaluatedClaims ?? []) as any} />
    </Card>
  )

  const WrappedOracleCard = withEntityData(OracleCard)

  return (
    <Flex direction='column' w='100%' gap={6}>
      <Flex w='100%' align='stretch' gap={6}>
        <Flex h='100%' style={{ flex: '0 0 300px' }}>
          <WrappedOracleCard entity={oracleEntity} />
        </Flex>
        {renderOracleStats()}
        {renderCreditsVerified()}
      </Flex>
      <Flex w='100%' h='320px'>
        {renderClaimEvaluation()}
      </Flex>
      {/* <Flex width='100%' height='400px' $gap={6}>
        {renderClaimLocations()}
        {renderLatestClaims()}
      </Flex> */}
      <Flex w='100%'>{renderEvaluatedClaims()}</Flex>
    </Flex>
  )
}

export default Overview
