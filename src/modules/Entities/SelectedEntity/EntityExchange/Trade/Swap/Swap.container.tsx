import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import AssetNewCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetNewCard'
import { TermsOfUseType } from 'modules/Entities/types'

import { CardHeader } from './Swap.container.styles'

const Swap: React.FunctionComponent = () => {
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <CardHeader>I want</CardHeader>
          <AssetNewCard
            did={selectedEntity.did}
            name={selectedEntity.name}
            logo={selectedEntity.logo}
            image={selectedEntity.image}
            sdgs={selectedEntity.sdgs}
            description={selectedEntity.description}
            dateCreated={selectedEntity.dateCreated}
            badges={[]}
            version={''}
            termsType={TermsOfUseType.PayPerUse}
            isExplorer={false}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">Swap!!</div>
      </div>
    </div>
  )
}
export default Swap
