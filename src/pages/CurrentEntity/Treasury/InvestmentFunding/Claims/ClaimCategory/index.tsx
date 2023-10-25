import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  category: string
  selected?: boolean
  onSelect?: () => void
}

const ClaimCategory: React.FC<Props> = ({ category, selected = false, onSelect }) => {
  const theme: any = useTheme()
  return (
    <FlexBox
      borderRadius='4px'
      border={`1px solid ${selected ? theme.ixoNewBlue : theme.ixoGrey300}`}
      p={2}
      cursor='pointer'
      onClick={onSelect && onSelect}
    >
      <Typography size='sm' weight='bold' color='darkest-blue'>
        {category}
      </Typography>
    </FlexBox>
  )
}

export default ClaimCategory
