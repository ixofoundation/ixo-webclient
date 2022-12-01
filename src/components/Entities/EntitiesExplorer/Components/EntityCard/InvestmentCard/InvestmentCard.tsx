import React, { useEffect, useState } from 'react'
import { excerptText } from 'utils/formatters'
import { convertPrice } from 'utils/currency'
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
import { TermsOfUseType, LiquiditySource, FundSource } from 'types/entities'
import { termsOfUseTypeStrategyMap } from 'types/entities.map'
import Tooltip, { TooltipPosition } from 'components/Tooltip/Tooltip'
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
  badges: string[]
  goal: string
  funding: any
  liquidity: any
  ddoTags: any[]
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
  liquidity,
  ddoTags,
}) => {
  const termsOfUseMap = termsOfUseTypeStrategyMap[termsType]
  const [target, setTarget] = useState<number | null>(null)
  const [alpha, setAlpha] = useState<number | null>(null)
  const [percent, setPercent] = useState<number | null>(null)

  useEffect(() => {
    try {
      const value = goal
        .split(' ')
        .pop()!
        .replace(/[^\w\s]/gi, '')
      if (!parseInt(value)) {
        // eslint-disable-next-line
        throw 'invalid goal'
      }
      setTarget(parseInt(value))
    } catch (e) {
      setTarget(0.0)
    }
    let alphaBonds = undefined

    if (funding && funding.items.length > 0) {
      alphaBonds = funding.items.filter((fund: any) => fund['@type'] === FundSource.Alphabond)![0] ?? undefined
    } else if (liquidity && liquidity.items.length > 0) {
      alphaBonds = liquidity.items.filter((elem: any) => elem['@type'] === LiquiditySource.Alphabond)![0] ?? undefined
    }

    if (alphaBonds) {
      Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBonds.id}`).then((response) => {
        const func = response.data?.result?.value?.function_parameters?.filter(
          (func: any) => func['param'] === 'systemAlpha',
        )
        if (func) {
          setAlpha(Number(Number(func[0]?.value).toFixed(2)))
        }

        const currentReserve = response.data?.result?.value?.current_reserve[0]
        if (currentReserve) {
          setPercent(currentReserve / target!)
        }
      })
    }
    // eslint-disable-next-line
  }, [])

  const ddoTag: any = ddoTags.find((value: any) => value.name === 'Instrument')

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
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg').default})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <div className='row'>
            <div className='col-6'>
              <Shield
                label='Investment'
                text={ddoTag?.tags ? ddoTag.tags[0] : 'Investment'}
                color={ShieldColor.Yellow}
              />
            </div>
            <div className='col-6 text-right'>
              <Badges badges={badges} />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className='row'>
            <div className='col-4'>
              <StatisticValue>{percent ? percent : 0}%</StatisticValue>
              <StatisticLabel>Funded</StatisticLabel>
            </div>
            <div className='col-4'>
              <StatisticValue>${convertPrice(target!, 0) ?? 0}</StatisticValue>
              <StatisticLabel>Target</StatisticLabel>
            </div>
            <div className='col-4'>
              <StatisticValue>{alpha && !isNaN(alpha) ? alpha : 0}</StatisticValue>
              <StatisticLabel>Alpha</StatisticLabel>
            </div>
          </StatisticsContainer>
          <CardBottomLogoContainer className='row'>
            <div className='col-6'>
              {termsOfUseMap && (
                <Tooltip text={termsOfUseMap.title} position={TooltipPosition.Bottom}>
                  {React.createElement(termsOfUseMap.icon, {
                    width: 34,
                    fill: 'black',
                  })}
                </Tooltip>
              )}
            </div>
            <div className='col-6 text-right'>
              <Logo src={logo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default InvestmentCard
