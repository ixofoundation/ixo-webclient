import React, { useEffect, useState } from 'react'
import { excerptText } from 'common/utils/formatters'
import { convertPrice } from 'common/utils/currency.utils'
import {
  CardContainer,
  CardLink,
  CardBottom,
  MainContent,
  Title,
  StatisticsContainer,
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
  Description,
  CardTop,
  CardTopContainer,
} from '../EntityCard.styles'
import { TermsOfUseType, FundSource } from 'modules/Entities/types'
import { termsOfUseTypeStrategyMap } from 'modules/Entities/strategy-map'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import SDGIcons from '../SDGIcons/SDGIcons'
import Shield, { ShieldColor } from '../Shield/Shield'
import Badges from '../Badges/Badges'
import Axios from 'axios'

interface Props {
  did: string
  name: string
  logo: string
  sdgs: string[]
  image: string
  description: string
  termsType: TermsOfUseType
  badges: string[],
  goal: string,
  funding: any,
  ddoTags: []
}

const InvestmentCard: React.FunctionComponent<Props> = ({
  did,
  name,
  logo,
  image,
  sdgs,
  description,
  termsType,
  badges,
  goal,
  funding,
  ddoTags,
}) => {
  const termsOfUseMap = termsOfUseTypeStrategyMap[termsType]
  const [target, setTarget] = useState(null)
  const [alpha, setAlpha] = useState(null)
  const [percent, setPercent] = useState(null)

  useEffect(() => {
    setTarget(parseInt(goal.split(' ').pop().replace(/[^\w\s]/gi, '')))

    const alphaBonds = funding.items.filter(
      (fund) => fund['@type'] === FundSource.Alphabond,
    )[0]

    if( alphaBonds ) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBonds.id}`,
      ).then((response) => {
        const func = response.data?.result?.value?.function_parameters?.filter(
          (func) => func['param'] === 'systemAlpha'
        )
        if( func ) {
          setAlpha(Number(func[0]?.value).toFixed(2))
        }
        
        const currentReserve = response.data?.result?.value?.current_reserve[0];
        if( currentReserve ) {
          setPercent(currentReserve/target);
        }
      })
    }
  }, [])

  const ddoTag : any = ddoTags.find((value:any) => value.name==='Instrument');

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
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <div className="row">
            <div className="col-6">
              <Shield
                label="Investment"
                text={ddoTag?.tags ? ddoTag.tags[0] : 'Investment'}
                color={ShieldColor.Yellow}
              />
            </div>
            <div className="col-6 text-right">
              <Badges badges={badges} />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className="row">
            <div className="col-4">
              <StatisticValue>{percent ? percent : 0}%</StatisticValue>
              <StatisticLabel>Funded</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>${convertPrice(target) ?? 0}</StatisticValue>
              <StatisticLabel>Target</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>{alpha&&!isNaN(alpha) ? alpha : 0}</StatisticValue>
              <StatisticLabel>Alpha</StatisticLabel>
            </div>
          </StatisticsContainer>
          <CardBottomLogoContainer className="row">
            <div className="col-6">
              <Tooltip
                text={termsOfUseMap.title}
                position={TooltipPosition.Bottom}
              >
                {React.createElement(termsOfUseMap.icon, {
                  width: 34,
                  fill: 'black',
                })}
              </Tooltip>
            </div>
            <div className="col-6 text-right">
              <Logo src={logo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default InvestmentCard
