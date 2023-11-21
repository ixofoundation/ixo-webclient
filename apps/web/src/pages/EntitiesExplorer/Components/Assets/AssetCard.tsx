import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import { FlexBox } from 'components/App/App.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { apiEntityToEntity } from 'utils/entities'
import { Typography } from 'components/Typography'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'hooks/account'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'
import { thousandSeparator } from 'utils/formatters'
import { useGetAccountTokens } from 'graphql/tokens'

interface Props {
  collectionName: string
  entity: any
  selected?: boolean
  isSelecting?: boolean
}

const AssetCard: React.FC<Props> = ({
  collectionName,
  entity: _entity,
  selected = false,
  isSelecting = false,
}): JSX.Element => {
  const theme: any = useTheme()
  const { cwClient } = useAccount()
  const [entity, setEntity] = useState<TEntityModel>()

  const no = entity?.alsoKnownAs.replace('{id}#', '')
  const id = entity?.id
  const image = entity?.profile?.image
  const logo = entity?.token?.properties.icon
  const name = entity?.profile?.name
  const maxSupply = entity?.token?.properties.maxSupply
  const zlottie = entity?.zlottie
  const tags = entity?.tags?.find(({ category }) => category === 'Asset Type')?.tags ?? []

  const adminAccount = useMemo(() => entity?.accounts?.find((v) => v.name === 'admin')?.address || '', [entity])

  const { data: accountTokens } = useGetAccountTokens(adminAccount)

  const [produced, setProduced] = useState(0)
  const [claimable, setClaimable] = useState(0)
  const [retired, setRetired] = useState(0)

  useEffect(() => {
    if (_entity) {
      setEntity(_entity)
      apiEntityToEntity({ entity: _entity, cwClient }, (key, value) => {
        setEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    }
    return () => {
      setEntity(undefined)
    }
  }, [_entity, cwClient])

  useEffect(() => {
    if (accountTokens['CARBON']) {
      const carbon = accountTokens['CARBON']
      const claimable = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.amount, 0)
      const produced = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.minted, 0)
      const retired = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.retired, 0)

      setProduced(produced)
      setClaimable(claimable)
      setRetired(retired)
      return () => {
        setProduced(0)
        setClaimable(0)
        setRetired(0)
      }
    }
  }, [accountTokens])

  return (
    <NavLink
      to={{ pathname: `/entity/${id}` }}
      state={{ collectionName: collectionName }}
      style={{ textDecoration: 'none' }}
    >
      <FlexBox direction='column' width='100%' borderRadius={'10px'} overflow='hidden'>
        <FlexBox
          position='relative'
          background={`url(${image!})`}
          width='100%'
          minHeight='170px'
          backgroundSize='100% 100%'
        >
          <FlexBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
            {zlottie && (
              <Lottie
                width={150}
                height={150}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: zlottie,
                }}
              />
            )}
          </FlexBox>
        </FlexBox>

        <FlexBox
          direction='column'
          justifyContent='space-between'
          p={4}
          gap={2}
          width='100%'
          height='100%'
          background={theme.ixoWhite}
        >
          <FlexBox gap={1} alignItems='center' height='24px'>
            {tags.map((tag, i) => (
              <FlexBox
                key={i}
                background={i % 2 ? theme.ixoOrange : theme.ixoDarkRed}
                borderRadius={'100px'}
                color='white'
                px={2}
                py={1}
              >
                <Typography size='sm'>{tag}</Typography>
              </FlexBox>
            ))}
          </FlexBox>

          <FlexBox direction='column' justifyContent='center' height='70px'>
            <Typography color='black' weight='bold' size='2xl' style={{ marginBottom: 4 }}>
              {name}
            </Typography>
            <Typography color='color-2' weight='normal' size='md'>
              {collectionName}
            </Typography>
          </FlexBox>

          <FlexBox direction='column' gap={1} width='100%'>
            <FlexBox gap={1} alignItems='baseline'>
              <Typography size='md' color='black' transform='uppercase'>
                {thousandSeparator(produced, ',')}
              </Typography>
              <Typography size='sm' color='black'>
                CARBON produced
              </Typography>
            </FlexBox>
            <ProgressBar
              total={claimable}
              approved={produced}
              rejected={retired}
              activeBarColor={theme.ixoLightGreen}
              height={8}
            />
            <FlexBox gap={1} alignItems='baseline'>
              <Typography size='sm' color='green'>
                {thousandSeparator(claimable, ',')} claimable
              </Typography>
              <Typography size='sm' color='blue'>
                {thousandSeparator(retired, ',')} retired
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
            <FlexBox alignItems='baseline'>
              <Typography color='black' weight='semi-bold' size='2xl'>
                #{no}&nbsp;
              </Typography>
              {maxSupply && (
                <Typography color='color-2' weight='medium' size='md'>
                  of {Number(maxSupply).toLocaleString()}
                </Typography>
              )}
            </FlexBox>

            <FlexBox
              width='32px'
              height='32px'
              borderRadius='100%'
              background={`url(${logo}), ${theme.ixoGrey100}`}
              backgroundSize='100%'
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </NavLink>
  )
}

export default AssetCard
