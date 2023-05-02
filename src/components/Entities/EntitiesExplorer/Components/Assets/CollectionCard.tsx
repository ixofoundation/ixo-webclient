import { TEntityModel } from 'api/blocksync/types/entities'
import { useEffect, useState } from 'react'
import { apiEntityToEntity } from 'utils/entities'
import styled from 'styled-components'
import { Typography } from 'components/Typography'
import { thousandSeparator } from 'utils/formatters'

export const CollectionCardBackground = styled.div<{ background: string }>`
  position: absolute;
  border-radius: 8px;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-image: url(${(props): string => props.background});
  transition: all 0.2s;

  //  mix-blend-mode: normal;
  //  border: 2px solid #00d2ff;
  //  filter: drop-shadow(0px 0px 20px rgba(0, 210, 255, 0.5));
`

export const CollectionCardWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 260px;
  color: white;

  &:hover {
    ${CollectionCardBackground} {
      background-size: 110% 110%;
    }
  }
`

export const CollectionCardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%);

  transition: all 0.2s;

  & span {
    color: white;
  }

  &:hover {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 100%);
    & > #sdg {
      display: none;
    }
    & > #total-supply,
    & > #description {
      display: -webkit-box;
    }
  }
`

export const CollectionCardSdgs = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`

export const CollectionCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CollectionCardHeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

export const CollectionCardHeaderLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
`

export const CollectionCardTotalSupply = styled(Typography)`
  display: none;
`

export const CollectionCardDescription = styled(Typography)`
  display: none;
  max-width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const SdgIcon = styled.i`
  font-size: 20px;
  color: white;
`

const CollectionCard: React.FC<any> = (apiEntity) => {
  const [collection, setCollection] = useState<TEntityModel>()

  const logo = collection?.profile?.logo

  const image = collection?.token?.image
  const name = collection?.token?.name
  const tokenName = collection?.token?.tokenName
  const description = collection?.token?.description
  const maxSupply = collection?.token?.properties.maxSupply

  useEffect(() => {
    setCollection(apiEntity)
    apiEntityToEntity({ entity: apiEntity }, (key, value) => {
      setCollection((collection: any) => ({ ...collection, [key]: value }))
    })
  }, [apiEntity])

  return (
    <CollectionCardWrapper>
      <CollectionCardBackground background={image!} />

      <CollectionCardContainer>
        <CollectionCardSdgs id='sdg'>
          {/* {collection.sdgs.map((sdg, index) => (
            <SdgIcon key={index} className={sdg} />
          ))} */}
          SDG
        </CollectionCardSdgs>

        <CollectionCardHeader>
          <CollectionCardHeaderText>
            <Typography weight='bold' size='2xl' style={{ marginBottom: 5 }}>
              {tokenName}
            </Typography>
            <Typography weight='normal' size='md'>
              {name}
            </Typography>
          </CollectionCardHeaderText>
          <CollectionCardHeaderLogo src={logo} alt='' />
        </CollectionCardHeader>

        <CollectionCardTotalSupply id='total-supply' weight='normal' size='lg'>
          {thousandSeparator(maxSupply, ',')} impact tokens
        </CollectionCardTotalSupply>

        <CollectionCardDescription id='description' weight='normal' size='md'>
          {description}
        </CollectionCardDescription>
      </CollectionCardContainer>
    </CollectionCardWrapper>
  )
}

export default CollectionCard
