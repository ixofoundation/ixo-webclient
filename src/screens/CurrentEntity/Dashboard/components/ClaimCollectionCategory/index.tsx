import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { ClaimCollection } from 'generated/graphql'
import { useGetClaimTemplateEntityByCollectionId } from 'graphql/claims'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  claimCollection: ClaimCollection
  selected?: boolean
  onSelect?: () => void
}

export const ClaimCollectionCategoryTitle = ({ claimCollection }: Partial<Props>) => {
  const templateEntity = useGetClaimTemplateEntityByCollectionId(claimCollection?.id ?? '')
  if (!templateEntity) {
    return null
  }

  return `${templateEntity?.profile?.name || ''}`
}

const ClaimCollectionCategory: React.FC<Props> = ({ claimCollection, selected = false, onSelect }) => {
  const theme: any = useTheme()
  const templateEntity = useGetClaimTemplateEntityByCollectionId(claimCollection.id!)

  if (!templateEntity) {
    return null
  }
  return (
    <FlexBox
      $borderRadius='4px'
      border={`1px solid ${selected ? theme.ixoNewBlue : theme.ixoGrey300}`}
      p={2}
      cursor='pointer'
      onClick={onSelect && onSelect}
    >
      <Typography size='sm' weight='bold'>
        {templateEntity.profile?.name || ''}
      </Typography>
    </FlexBox>
  )
}

export default ClaimCollectionCategory
