import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import useCurrentEntity from 'hooks/currentEntity'
import { TEntityClaimModel } from 'types/entities'
import { useHistory, useParams } from 'react-router-dom'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { useGetClaimCollectionByEntityIdAndClaimTemplateId } from 'graphql/claims'

/**
 * @deprecated
 * @param item
 * @returns
 */
export const ClaimsItem: React.FC<TEntityClaimModel> = (item) => {
  const theme: any = useTheme()
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const protocolId = item.template?.id.split('#')[0] ?? ''
  const claimCollection = useGetClaimCollectionByEntityIdAndClaimTemplateId({ entityId, protocolId })
  const claimCollectionId = claimCollection?.id

  return (
    <FlexBox width='100%' alignItems='center' gap={2}>
      <FlexBox
        width='100%'
        cursor={'pointer'}
        onClick={() => {
          const search = new URLSearchParams()
          search.append('claimId', item.id)
          history.push({ pathname: history.location.pathname, search: search.toString() })
        }}
      >
        <Typography variant='primary' size='sm'>
          {item.template?.title ?? ''}
        </Typography>
      </FlexBox>
      <FlexBox
        width='100%'
        borderRadius='8px'
        background={theme.ixoGrey100}
        p={3}
        gap={2}
        alignItems='center'
        borderColor={'transparent'}
        borderWidth={'1px'}
        borderStyle={'solid'}
        hover={{ borderColor: theme.ixoNewBlue }}
        cursor={'pointer'}
      >
        <SvgBox svgWidth={5} svgHeight={5} color={theme.ixoBlack}>
          <PlusIcon />
        </SvgBox>
        <Typography
          size='sm'
          color='black'
          onClick={() => {
            const search = new URLSearchParams()
            search.append('claimId', item.id)
            search.append('claimCollectionId', claimCollectionId)
            history.push({ pathname: history.location.pathname, search: search.toString() })
          }}
        >
          Offer
        </Typography>
      </FlexBox>
    </FlexBox>
  )
}

const ClaimsCard: React.FC = () => {
  const history = useHistory()
  const { claim } = useCurrentEntity()

  return (
    <Card
      icon={<ClaimIcon />}
      title='Claims'
      columns={1}
      items={Object.values(claim).map((claim) => ({
        content: claim.template?.title ?? '',
        onClick: () => {
          const search = new URLSearchParams()
          search.append('claimId', claim.id)
          history.push({ pathname: history.location.pathname, search: search.toString() })
        },
      }))}
    />
  )
}

export default ClaimsCard
