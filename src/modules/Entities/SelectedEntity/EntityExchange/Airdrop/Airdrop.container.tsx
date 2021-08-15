import { RootState } from 'common/redux/types'
import React from 'react'
import { useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'

// export interface Props {
// }

const Airdrop: React.FunctionComponent = () => {
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)

  return (
    <>
      <DataCard
        did={selectedEntity.did}
        name={selectedEntity.name}
        logo={selectedEntity.logo}
        image={selectedEntity.image}
        sdgs={selectedEntity.sdgs}
        description={selectedEntity.description}
        badges={[]}
        version={''}
        termsType={TermsOfUseType.PayPerUse}
        isExplorer={false}
      />
    </>
  )
}
export default Airdrop
