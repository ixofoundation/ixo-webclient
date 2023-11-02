import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'

interface Props {
  claimCollection: any
  selected?: boolean
  onSelect?: () => void
}

const ClaimCategory: React.FC<Props> = ({ claimCollection, selected = false, onSelect }) => {
  const theme: any = useTheme()
  const templateId: string = claimCollection.protocol
  const templateEntity: TEntityModel | undefined = useAppSelector(selectEntityById(templateId))

  return (
    <FlexBox
      borderRadius='4px'
      border={`1px solid ${selected ? theme.ixoNewBlue : theme.ixoGrey300}`}
      p={2}
      cursor='pointer'
      onClick={onSelect && onSelect}
    >
      <Typography size='sm' weight='bold' color='darkest-blue'>
        {templateEntity?.profile?.name ?? claimCollection.id}
      </Typography>
    </FlexBox>
  )
}

export default ClaimCategory
