import * as React from 'react'
import Axios from 'axios'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText } from 'common/utils/formatters'
import { CardContainer, CardLink, CardTop, CardTopContainer, CardBottom, Logo } from '../EntityCard.styles'

import { ActionButton, Title, Progress, ProgressSuccessful, ProgressRequired, Label } from './LaunchpadCard.styles'

import Shield from '../Shield/Shield'
import { EntityType, LiquiditySource, FundSource } from 'modules/Entities/types'
import { getDisplayAmount } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
import { DDOTagCategory } from 'redux/entitiesExplorer/entitiesExplorer.types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { get } from 'lodash'
import { BondStateType } from 'redux/bond/bond.types'

interface Props {
  did: string
  name: string
  status: string
  requiredClaimsCount: number
  rejectedClaimsCount: number
  goal: string
  image: string
  logo: string
  ddoTags: DDOTagCategory[]
  entityClaims: any
  linkedEntities: any[]
}

const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  // status,
  logo,
  image,
  // ddoTags,
  requiredClaimsCount: requiredClaims,
  rejectedClaimsCount: rejectedClaims,
  entityClaims,
  linkedEntities,
}) => {
  const colors = {
    [BondStateType.HATCH]: '#39C3E6',
    [BondStateType.OPEN]: '#39C3E6',
    [BondStateType.SETTLED]: '#52A675',
    [BondStateType.FAILED]: '#E85E15',
  }
  const buttonTexts = {
    [BondStateType.HATCH]: null,
    [BondStateType.OPEN]: 'VOTE NOW',
    [BondStateType.SETTLED]: 'GET REWARD',
    [BondStateType.FAILED]: 'UNSTAKE',
  }

  const linkedInvestmentDid =
    linkedEntities.find((entity) => {
      return entity['@type'] === EntityType.Investment
    })?.id ?? null

  const fetchInvestment: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(linkedInvestmentDid)

  // const [bondDid, setBondDid] = React.useState(null)

  const maxVotes = entityClaims.items[0].targetMax ?? 0
  const goal = entityClaims.items[0].goal ?? ''

  const [currentVotes, setCurrentVotes] = React.useState(0)
  const [bondState, setBondState] = React.useState<BondStateType>(BondStateType.HATCH)

  const displayBondState = (state: BondStateType): string => {
    switch (state) {
      case BondStateType.HATCH:
        return 'Created'
      case BondStateType.OPEN:
        return 'Candidate'
      case BondStateType.SETTLED:
        return 'Selected'
      case BondStateType.FAILED:
        return 'Not Selected'
      default:
        return null!
    }
  }

  React.useEffect(() => {
    if (!linkedInvestmentDid) {
      return
    }
    fetchInvestment.then((apiEntity: ApiListedEntity) => {
      let alphaBonds: any[] = []

      if (apiEntity.data.funding) {
        // TODO: should be removed
        alphaBonds = apiEntity.data.funding.items.filter((elem) => elem['@type'] === FundSource.Alphabond)
      } else if (apiEntity.data.liquidity) {
        alphaBonds = apiEntity.data.liquidity.items.filter((elem) => elem['@type'] === LiquiditySource.Alphabond)
      }

      return Promise.all(
        alphaBonds.map((alphaBond) => {
          return Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBond.id}`, {
            transformResponse: [
              (response: string): any => {
                const parsedResponse = JSON.parse(response)

                return get(parsedResponse, 'result.value', parsedResponse)
              },
            ],
          })
        }),
      ).then((bondDetails) => {
        const bondToShow = bondDetails.map((bondDetail) => bondDetail.data).find((bond) => bond.alpha_bond)

        if (bondToShow) {
          const current_reserve = bondToShow.current_reserve[0]
          // setBondDid(bondToShow.bond_did)
          setBondState(bondToShow.state)
          setCurrentVotes(Number(getDisplayAmount(new BigNumber(current_reserve?.amount ?? 0))))
        }
      })
    })
    // eslint-disable-next-line
  }, [linkedInvestmentDid])

  return (
    <CardContainer className='col-xl-4 col-md-6 col-sm-12 col-12'>
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              background: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg').default})`,
              backgroundColor: '#387F6A',
            }}
          ></CardTopContainer>
        </CardTop>
        <CardBottom>
          <div className='row align-items-center' style={{ paddingLeft: 16, paddingRight: 16 }}>
            <Shield label='Status' text={displayBondState(bondState)} color={colors[bondState]} />

            {bondState !== BondStateType.HATCH && <ActionButton>{buttonTexts[bondState]}</ActionButton>}

            {/* <img
              alt=""
              src={require('assets/images/yoma.png').default}
              className="ml-auto"
            /> */}
            <Logo className='ml-auto' src={logo} />
          </div>
          <Title>{excerptText(name, 10)}</Title>
          <ProgressBar
            total={requiredClaims}
            approved={currentVotes}
            rejected={rejectedClaims}
            activeBarColor='linear-gradient(180deg, #04D0FB 0%, #49BFE0 100%)'
          />
          <Progress>
            <ProgressSuccessful>{currentVotes}</ProgressSuccessful>
            <ProgressRequired>/{maxVotes}</ProgressRequired>
          </Progress>
          <Label>{goal}</Label>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
