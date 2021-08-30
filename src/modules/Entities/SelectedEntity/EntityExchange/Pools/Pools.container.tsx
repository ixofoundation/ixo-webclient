import React, { useEffect, useState } from 'react'
import { RootState } from 'common/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'

const Pools: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { entities } = useSelector((state: RootState) => state.entities)
  const [poolList, setPoolList] = useState<ExplorerEntity[]>([])

  useEffect(() => {
    dispatch(getEntities())
    // eslint-disable-next-line
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
            entityCategory.name === 'Asset Type' &&
            entityCategory.tags.includes('Pool'),
        ),
      )
    console.log(filtered)
    setPoolList(filtered)
  }, [entities])

  return (
    <div className='container-fluid'>
      <div className='row'>
        {poolList.length > 0 &&
          poolList.map((airdrop, i) => (
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
export default Pools
