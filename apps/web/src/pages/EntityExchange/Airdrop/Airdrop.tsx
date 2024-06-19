import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/hooks'
import DataCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AirdropCard/AirdropCard'
import { TermsOfUseType } from 'types/entities'
import { ExplorerEntity } from 'redux/entities/entities.types'

const Airdrop: React.FunctionComponent = () => {
  const { entities } = useAppSelector((state) => state.entities)
  const [airdropList, setAirdropList] = useState<ExplorerEntity[]>([])

  useEffect(() => {
    //  temporary placeholder
    if (!entities) {
      return
    }
    // const filtered = entities
    //   .filter((entity) => entity.type === EntityType.Project)
    //   .filter((entity) =>
    //     entity.ddoTags!.some(
    //       (entityCategory) =>
    //         entityCategory.category === 'Project Type' && entityCategory.tags.includes('Airdrop Mission'),
    //     ),
    //   )
    setAirdropList([])
  }, [entities])

  return (
    <div className='container-fluid'>
      <div className='row'>
        {airdropList.length > 0 &&
          airdropList.map((airdrop, i) => (
            <div className='col-lg-3 col-md-4 col-sm-6 col-12' key={i}>
              <DataCard
                did={airdrop.did}
                name={airdrop.name!}
                logo={airdrop.logo!}
                image={airdrop.image!}
                sdgs={airdrop.sdgs!}
                description={airdrop.description!}
                badges={[]}
                version={''}
                termsType={TermsOfUseType.PayPerUse}
                isExplorer={false}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
export default Airdrop
