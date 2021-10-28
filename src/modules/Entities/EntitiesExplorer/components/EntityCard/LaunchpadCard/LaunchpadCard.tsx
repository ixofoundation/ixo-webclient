import * as React from 'react'
import Axios from 'axios'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  CardBottom,
  Logo,
} from '../EntityCard.styles'

import {
  ActionButton,
  Title,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Label,
} from './LaunchpadCard.styles'

import Shield from '../Shield/Shield'
import { FundSource } from 'modules/Entities/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
import { DDOTagCategory } from 'modules/Entities/EntitiesExplorer/types'

interface Props {
  did: string
  name: string
  status: string
  requiredClaimsCount: number
  rejectedClaimsCount: number
  goal: string
  image: string
  logo: string
  funding: any
  ddoTags: DDOTagCategory[]
  entityClaims: any
}

export enum BondState {
  HATCH = 'HATCH',
  OPEN = 'OPEN',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
}

const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  // status,
  logo,
  image,
  funding,
  // ddoTags,
  requiredClaimsCount: requiredClaims,
  rejectedClaimsCount: rejectedClaims,
  entityClaims,
}) => {
  const colors = {
    [BondState.HATCH]: '#39C3E6',
    [BondState.OPEN]: '#39C3E6',
    [BondState.SETTLED]: '#52A675',
    [BondState.FAILED]: '#E85E15',
  }
  const buttonTexts = {
    [BondState.HATCH]: null,
    [BondState.OPEN]: 'VOTE NOW',
    [BondState.SETTLED]: 'GET REWARD',
    [BondState.FAILED]: 'UNSTAKE',
  }
  const bondDid = funding.items.filter(
    (item) => item['@type'] === FundSource.Alphabond,
  )[0]?.id
  const maxVotes = entityClaims.items[0].targetMax ?? 0
  const goal = entityClaims.items[0].goal ?? ''

  const [currentVotes, setCurrentVotes] = React.useState(0)
  const [bondState, setBondState] = React.useState<BondState>(BondState.HATCH)

  const getBondState = async (): Promise<BondState> => {
    return await Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}`)
      .then((response) => response.data)
      .then((response) => response.result)
      .then((response) => response.value)
      .then((response) => response.state)
      .catch(() => BondState.HATCH)
  }
  const getCurrentVotes = async (): Promise<number> => {
    return await Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_reserve`,
    )
      .then((response) => response.data)
      .then((response) => response.result[0])
      .then((response) =>
        response.denom !== 'uixo'
          ? Number(response.amount)
          : getBalanceNumber(new BigNumber(response.amount)),
      )
      .catch(() => 0)
  }

  const displayBondState = (state: BondState): string => {
    switch (state) {
      case BondState.HATCH:
        return 'Created'
      case BondState.OPEN:
        return 'Candidate'
      case BondState.SETTLED:
        return 'Selected'
      case BondState.FAILED:
        return 'Not Selected'
      default:
        return null
    }
  }

  React.useEffect(() => {
    if (bondDid) {
      getCurrentVotes().then((result) => setCurrentVotes(result))
      getBondState().then((result) => setBondState(result))
    }
  }, [bondDid])

  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              background: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
              backgroundColor: '#387F6A',
            }}
          ></CardTopContainer>
        </CardTop>
        <CardBottom>
          <div
            className="row align-items-center"
            style={{ paddingLeft: 16, paddingRight: 16 }}
          >
            <Shield
              label="Status"
              text={displayBondState(bondState)}
              color={colors[bondState]}
            />

            {bondState !== BondState.HATCH && (
              <ActionButton>{buttonTexts[bondState]}</ActionButton>
            )}

            {/* <img
              alt=""
              src={require('assets/images/yoma.png')}
              className="ml-auto"
            /> */}
            <Logo className="ml-auto" src={logo} />
          </div>
          <Title>{excerptText(name, 10)}</Title>
          <ProgressBar
            total={requiredClaims}
            approved={currentVotes}
            rejected={rejectedClaims}
            activeBarColor="linear-gradient(180deg, #04D0FB 0%, #49BFE0 100%)"
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
