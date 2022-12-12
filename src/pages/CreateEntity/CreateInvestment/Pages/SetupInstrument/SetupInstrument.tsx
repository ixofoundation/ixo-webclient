import { PropertyBox } from 'pages/CreateEntity/Components'
import React from 'react'
import { PageWrapper } from './Setupinstrument.styles'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

const SetupInstrument: React.FC = (): JSX.Element => {
  const handleAdd = (): void => {
    console.log('handleAdd')
  }
  return (
    <PageWrapper>
      <PropertyBox icon={<PlusIcon />} handleClick={handleAdd} />
    </PageWrapper>
  )
}

export default SetupInstrument
