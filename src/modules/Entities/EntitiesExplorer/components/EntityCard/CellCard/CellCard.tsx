import * as React from 'react'
import { Moment } from 'moment'
import { excerptText, toTitleCase } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  MainContent,
  Title,
  SubTitle,
  Logo,
} from '../EntityCard.styles'
// import { SummaryLabel, SummaryValue, SummaryContainer } from './CellCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import Shield, { ShieldColor } from '../Shield/Shield'

interface Props {
  dateCreated: Moment
  // TODO when data exists
  /*   memberCount: number
  projectCount: number */
  did: string
  name: string
  description: string
  image: string
  logo: string
  status: string
  sdgs: string[]
}

const CellCard: React.FunctionComponent<Props> = ({
  dateCreated,
  /*   memberCount,
  projectCount, */
  did,
  name,
  description,
  image,
  logo,
  status,
  sdgs,
}) => {
  const shield = toTitleCase(status ?? 'Created')

  const shieldColor = React.useMemo(() => {
    switch (shield) {
      case 'Created':
        return ShieldColor.Orange
      case 'Completed':
        return ShieldColor.Grey
      default:
        return ShieldColor.Blue
    }
  }, [shield])

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
                label="Status"
                text={toTitleCase(shield)}
                color={shieldColor}
              />
            </div>
            <div className="col-6 text-right">
              <Logo src={logo} />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
            <SubTitle>
              Founded on <strong>{dateCreated.format('DD MMM YYYY')}</strong>
            </SubTitle>
          </MainContent>
          {/* <SummaryContainer className="row"> */}
          {/* <div className="col-6"> */}
          {/* TODO - replace with actual value */}
          {/* <SummaryValue>12</SummaryValue> */}
          {/* <SummaryLabel>members</SummaryLabel> */}
          {/* </div> */}
          {/* <div className="col-6"> */}
          {/* TODO - replace with actual value */}
          {/* <SummaryValue>22</SummaryValue> */}
          {/* <SummaryLabel>projects</SummaryLabel> */}
          {/* </div> */}
          {/* </SummaryContainer> */}
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default CellCard
