import React, { useEffect, useState } from 'react'
import { RootState } from 'common/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'

const Airdrop: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { entities } = useSelector((state: RootState) => state.entities)
  const [airdropList, setAirdropList] = useState<ExplorerEntity[]>([])

  useEffect(() => {
    dispatch(getEntities())
  }, [])

  useEffect(() => {
    //  temporary placeholder
    console.log(entities)
    if (!entities) {
      return
    }
    let filtered = entities
      .filter(entity => entity.type === EntityType.Project)
      .filter(entity =>
        entity.ddoTags.some(
          entityCategory =>
            entityCategory.name === 'Project Type' &&
            entityCategory.tags.includes('Airdrop Mission'),
        ),
      )
    console.log(filtered)
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
