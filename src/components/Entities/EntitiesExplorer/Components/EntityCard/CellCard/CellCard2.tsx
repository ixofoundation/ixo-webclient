import * as React from 'react'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { excerptText } from 'utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  MainContent,
  MultiLineTitle,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  // Logo,
  // StatisticLabel,
  CardTag,
  CardTags,
} from '../EntityCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import { theme } from 'components/App/App.styles'
import { requireCheckDefault } from 'utils/images'
import { TEntityDDOTagModel, TEntityProfileModel } from 'types/protocol'

interface Props {
  id: string
  profile: TEntityProfileModel
  tags: TEntityDDOTagModel[]
}

const DAOCard: React.FunctionComponent<Props> = ({ id, profile, tags }) => {
  const sdgs = tags ? tags.find(({ category, tags }) => category === 'SDG' && Array.isArray(tags))?.tags ?? [] : []

  if (!profile) {
    return null
  }

  return (
    <CardContainer className='col-xl-4 col-md-6 col-sm-12 col-12'>
      <CardLink
        to={{
          pathname: `/entity/${id}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${profile.image}),url(${requireCheckDefault(
                require('assets/images/ixo-placeholder-large.jpg'),
              )})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(profile.description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <CardTags>
            <CardTag tagColor={theme.ixoGreen}>Candidate</CardTag>
          </CardTags>
          <MainContent>
            <MultiLineTitle fontWeight={700}>{profile.name}</MultiLineTitle>
          </MainContent>
          <ProgressBar total={0} pending={0} approved={0} rejected={0} disputed={0} />
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <Progress>
                <ProgressSuccessful>{0}</ProgressSuccessful>
                <ProgressRequired>/{0}</ProgressRequired>
              </Progress>
              {/* <StatisticLabel>{impactAction}</StatisticLabel> */}
            </div>
            {/* <Logo src={logo} /> */}
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DAOCard
