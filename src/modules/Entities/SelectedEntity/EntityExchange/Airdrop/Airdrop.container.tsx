import React, { useEffect, useState } from 'react'
import { RootState } from 'redux/types'
import { useDispatch, useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { ExplorerEntity } from 'redux/entitiesExplorer/entitiesExplorer.types'
import { getEntities } from 'redux/entitiesExplorer/entitiesExplorer.actions'

const Airdrop: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { entities } = useSelector((state: RootState) => state.entities)
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
        entity.ddoTags.some(
          (entityCategory) => entityCategory.name === 'Project Type' && entityCategory.tags.includes('Airdrop Mission'),
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
                name={airdrop.name}
                logo={airdrop.logo}
                image={airdrop.image}
                sdgs={airdrop.sdgs}
                description={airdrop.description}
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
