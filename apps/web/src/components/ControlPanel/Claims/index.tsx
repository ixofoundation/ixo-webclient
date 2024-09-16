import React from 'react'
import { Card } from '../Card'

import { TEntityClaimModel } from 'types/entities'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

import { useGetClaimCollectionByEntityIdAndClaimTemplateId } from 'graphql/claims'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

/**
 * @deprecated
 * @param item
 * @returns
 */
export const ClaimsItem: React.FC<TEntityClaimModel> = (item) => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const protocolId = item.template?.id.split('#')[0] ?? ''
  const claimCollection = useGetClaimCollectionByEntityIdAndClaimTemplateId({ entityId, protocolId })
  const claimCollectionId = claimCollection?.id

  return (
    <FlexBox width='100%' $alignItems='center' $gap={2}>
      <FlexBox
        width='100%'
        cursor={'pointer'}
        onClick={() => {
          const search = new URLSearchParams()
          search.append('claimId', item.id)
          navigate({ pathname: location.pathname, search: search.toString() })
        }}
      >
        <Typography variant='primary' size='sm'>
          {item.template?.title ?? ''}
        </Typography>
      </FlexBox>
      <FlexBox
        width='100%'
        $borderRadius='8px'
        background={theme.ixoGrey100}
        p={3}
        $gap={2}
        $alignItems='center'
        $borderColor={'transparent'}
        $borderWidth={'1px'}
        $borderStyle={'solid'}
        hover={{ $borderColor: theme.ixoNewBlue }}
        cursor={'pointer'}
      >
        <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoBlack}>
          <img src='/assets/images/icon-plus.svg' />
        </SvgBox>
        <Typography
          size='sm'
          color='black'
          onClick={() => {
            const search = new URLSearchParams()
            search.append('claimId', item.id)
            search.append('claimCollectionId', claimCollectionId)
            navigate({ pathname: location.pathname, search: search.toString() })
          }}
        >
          Offer
        </Typography>
      </FlexBox>
    </FlexBox>
  )
}

const ClaimsCard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))

  const items = entity?.claim
    ? Object.values(entity?.claim).map((claim) => ({
        content: claim.template?.title ?? '',
        onClick: () => {
          const search = new URLSearchParams()
          search.append('claimId', claim.id)
          navigate({ pathname: location.pathname, search: search.toString() })
        },
      }))
    : []

  if (items.length === 0) return null

  return <Card icon={<img src='/assets/images/icon-claim.svg' />} title='Claims' columns={1} items={items} />
}

export default ClaimsCard
