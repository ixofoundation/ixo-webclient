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
import { TEntityDDOTagModel, TEntityLinkedEntityModel, TEntityProfileModel } from 'types/protocol'
import { Typography } from 'components/Typography'
import { getDaoContractMembersInfo } from 'utils/dao'
import { useAccount } from 'hooks/account'
import { useEffect, useState } from 'react'

interface Props {
  id: string
  profile: TEntityProfileModel
  tags: TEntityDDOTagModel[]
  linkedEntity: TEntityLinkedEntityModel[]
}

const DAOCard: React.FunctionComponent<Props> = ({ id, profile, tags, linkedEntity }) => {
  const sdgs = tags ? tags.find((item) => item && item.category === 'SDG' && Array.isArray(item.tags))?.tags ?? [] : []

  const { cosmWasmClient, address } = useAccount()
  const [numOfMembers, setNumOfMembers] = useState(0)

  useEffect(() => {
    if (linkedEntity.length > 0) {
      linkedEntity
        .filter((item: TEntityLinkedEntityModel) => item.type === 'Group')
        .forEach((item: TEntityLinkedEntityModel) => {
          const { id } = item
          const [, coreAddress] = id.split('#')
          getDaoContractMembersInfo({ coreAddress, cosmWasmClient, address })
            .then((members) => {
              setNumOfMembers((numOfMembers) => numOfMembers + members.length)
            })
            .catch(() => undefined)
        })
      return () => {
        setNumOfMembers(0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!cosmWasmClient])

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
