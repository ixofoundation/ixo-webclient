import React from 'react'
import { Wrapper } from './SetupPageContent.styles'
import { TEntityPageModel } from 'types/entities'
import EntityPageCreate from 'components/EntityPageCreate/EntityPageCreate'

interface Props {
  entityType: string
  page: TEntityPageModel
  onChange: (page: any) => void
  onClose: () => void
}

const SetupPageContent: React.FC<Props> = ({ page, onChange, onClose }): JSX.Element => {
  return (
    <Wrapper>
      <EntityPageCreate page={page} onChange={onChange} onClose={onClose} />
    </Wrapper>
  )
}

export default SetupPageContent
