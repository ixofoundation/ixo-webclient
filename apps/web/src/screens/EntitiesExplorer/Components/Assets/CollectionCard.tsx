import { useEffect, useState } from 'react'
import { apiEntityToEntity } from 'utils/entities'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { getSDGIcon } from 'components/Modals/SelectionModal/SelectionModal'
import { useAccount } from 'hooks/account'
import { TEntityModel } from 'types/entities'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { useGetAssetDevicesByCollectionIdAndOwner } from 'graphql/entities'
import { transformStorageEndpoint } from 'new-utils'

const CollectionCard: React.FC<any> = (apiEntity) => {
  const theme: any = useTheme()
  const { address } = useAccount()
  const [collection, setCollection] = useState<TEntityModel>()

  const collectionId = apiEntity.id
  const logo = transformStorageEndpoint(collection?.token?.properties?.icon ?? '')
  const image = collection?.profile?.image
  const collectionName = collection?.token?.name
  const name = collection?.profile?.name
  const tokenName = collection?.token?.tokenName
  // const description = collection?.token?.description

  const sdgs = collection?.tags
    ? (collection.tags.find((item) => item && item.category === 'SDG' && Array.isArray(item.tags))?.tags ?? [])
    : []

  const { totalCount: numOfPurchase } = useGetAssetDevicesByCollectionIdAndOwner(collectionId, address)

  useEffect(() => {
    setCollection(apiEntity)
    apiEntityToEntity({ entity: apiEntity }, (key, value) => {
      setCollection((collection: any) => ({ ...collection, [key]: value }))
    })
    return () => {
      setCollection(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FlexBox
      width='100%'
      $direction='column'
      background='white'
      $borderRadius='8px'
      $boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25);'
      color={theme.ixoBlack}
      overflow='hidden'
      cursor='pointer'
      transition='.2s box-shadow'
      hover={{ $boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)' }}
    >
      <FlexBox
        position='relative'
        background={`url(${image!})`}
        $backgroundPosition='center center'
        $backgroundSize='cover'
        $backgroundRepeat='no-repeat'
        width='100%'
        height='150px'
      >
        <FlexBox $gap={2.5} $alignItems='center' position='absolute' top='8px' right='8px'>
          {sdgs.map((value, index) => {
            const sdgIcon = getSDGIcon(value)
            return <i key={index} className={sdgIcon.class} style={{ color: 'white' }} />
          })}
        </FlexBox>
      </FlexBox>

      <FlexBox $direction='column' $gap={2} p={4} pt={6} width='100%' position='relative'>
        <FlexBox
          position='absolute'
          top='0px'
          left='16px'
          transform='translateY(-50%)'
          width='32px'
          height='32px'
          background={`url(${logo!}), white`}
          $backgroundPosition='center center'
          $backgroundSize='100% 100%'
          $borderRadius='100%'
          $boxShadow='0px 2px 2px 0px rgba(0, 0, 0, 0.25)'
        />

        <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
          <Typography size='md' weight='semi-bold'>
            {collectionName}
          </Typography>
          <Typography size='md'>{numOfPurchase}</Typography>
        </FlexBox>

        <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
          <Typography color='dark-blue' size='sm' weight='semi-bold'>
            {name}
          </Typography>
          <FlexBox $justifyContent='space-between' $borderRadius='8px' background={theme.ixoGreen} py={1} px={2}>
            <Typography size='sm' transform='uppercase' color='white'>
              {tokenName}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default CollectionCard
