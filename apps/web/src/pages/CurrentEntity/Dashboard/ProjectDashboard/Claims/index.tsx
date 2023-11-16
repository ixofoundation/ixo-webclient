import { FlexBox } from 'components/App/App.styles'
import ProtocolCard from 'pages/EntitiesExplorer/Components/EntityCard/ProtocolCard'
import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
import { useParams } from 'react-router-dom'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityClaimModel } from 'types/entities'

const Claim: React.FC<TEntityClaimModel> = ({ id, template }) => {
  const { entityId } = useParams<{ entityId: string }>()
  const [templateEntityId] = (template?.id || '').split('#')
  const templateEntity = useAppSelector(selectEntityById(templateEntityId))

  if (!templateEntity) {
    return null
  }
  return <ProtocolCard {...templateEntity} to={`/entity/${entityId}/dashboard/claims/${id}`} />
}

const Claims: React.FC = () => {
  const { claim } = useCurrentEntity()
  const claims: TEntityClaimModel[] = Object.values(claim)

  return (
    <FlexBox width='100%' gap={4} flexWrap='wrap'>
      {claims.map((claim: TEntityClaimModel, index) => (
        <FlexBox key={index} flexBasis='33%'>
          <Claim {...claim} />
        </FlexBox>
      ))}
    </FlexBox>
  )
}

export default Claims
