import * as React from 'react'
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
  CardTag,
  CardTags,
} from '../EntityCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import { FlexBox } from 'components/App/App.styles'
import { requireCheckDefault } from 'utils/images'
import { TEntityDDOTagModel, TEntityProfileModel } from 'types/protocol'
import { Typography } from 'components/Typography'

interface Props {
  id: string
  profile: TEntityProfileModel
  tags: TEntityDDOTagModel[]
}

const DAOCard: React.FunctionComponent<Props> = ({ id, profile, tags }) => {
  const sdgs = tags ? tags.find((item) => item && item.category === 'SDG' && Array.isArray(item.tags))?.tags ?? [] : []
  const numOfMembers = 0

  return (
    <CardContainer>
      <CardLink
        to={{
          pathname: `/entity/${id}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${profile?.image}),url(${requireCheckDefault(
                require('assets/images/ixo-placeholder-large.jpg'),
              )})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(profile?.description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <CardTags>
            <CardTag tagColor={'#5197B6'}>DAO</CardTag>
          </CardTags>
          <MainContent>
            <MultiLineTitle fontWeight={700}>{profile?.name}</MultiLineTitle>
          </MainContent>

          <FlexBox width='100%' alignItems='baseline' gap={1}>
            <Typography color='black' size='4xl'>
              {numOfMembers}
            </Typography>
            <Typography color='grey700'>Members</Typography>
          </FlexBox>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DAOCard
