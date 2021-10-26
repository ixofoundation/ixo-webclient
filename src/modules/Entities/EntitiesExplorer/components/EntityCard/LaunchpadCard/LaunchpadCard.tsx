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
}

const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  status,
  logo,
  image,
  funding,
  ddoTags,
  requiredClaimsCount: requiredClaims,
  rejectedClaimsCount: rejectedClaims,
}) => {
  console.log('ddoTags', ddoTags)
  const colors = {
    CREATED: '#39C3E6',
    Candidate: '#39C3E6',
    Selected: '#52A675',
    'Not Selected': '#E85E15',
  }
  const buttonTexts = {
    Candidate: 'VOTE NOW',
    Selected: 'GET REWARD',
    'Not Selected': 'UNSTAKE',
  }
  const bondDid = funding.items.filter(
    (item) => item['@type'] === FundSource.Alphabond,
  )[0]?.id
  const [currentVotes, setCurrentVotes] = React.useState(0)

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

  React.useEffect(() => {
    if (bondDid) {
      getCurrentVotes().then((result) => setCurrentVotes(result))
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
              text={status ? status.toLowerCase() : 'Created'}
              color={colors[status]}
            />

            {status !== 'CREATED' && (
              <ActionButton>{buttonTexts[status]}</ActionButton>
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
            <ProgressRequired>/{requiredClaims}</ProgressRequired>
          </Progress>
          <Label>Votes</Label>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
