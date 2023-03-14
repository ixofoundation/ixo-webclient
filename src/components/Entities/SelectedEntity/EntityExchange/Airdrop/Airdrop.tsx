import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import DataCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'types/entities'
import { ExplorerEntity } from 'redux/entitiesExplorer/entitiesExplorer.types'
import { getEntities } from 'redux/entitiesExplorer/entitiesExplorer.actions'

const Airdrop: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { entities } = useAppSelector((state) => state.entities)
  const [airdropList, setAirdropList] = useState<ExplorerEntity[]>([])

  useEffect(() => {
    dispatch(getEntities() as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //  temporary placeholder
    if (!entities) {
      return
    }
    const filtered = entities
      .filter((entity) => entity.type === EntityType.Project)
      .filter((entity) =>
        entity.ddoTags!.some(
          (entityCategory) =>
            entityCategory.category === 'Project Type' && entityCategory.tags.includes('Airdrop Mission'),
        ),
      )
    setAirdropList(filtered)
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
