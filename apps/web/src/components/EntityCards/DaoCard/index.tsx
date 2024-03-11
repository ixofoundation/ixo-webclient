import React from 'react'
import Lottie from 'react-lottie'
import { FlexBox, HTMLFlexBoxProps } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { thousandSeparator } from 'utils/formatters'
import { HorizontalLine } from 'components/HorizontalLine'
import { getEntityIcon } from 'utils/getEntityIcon'
import { useNavigate } from 'react-router'
import { getCDNURL } from '@ixo-webclient/utils'
import { Skeleton } from '@mantine/core'

interface Props extends HTMLFlexBoxProps {
  id: string
  collectionName?: string | null
  cardImage: string
  type: string
  metrics?: any
  creator: string
  tags: any
  animation: any
  title: any
  logo: string
  assetNumber: string | number
  maxSupply: string | number
}

export const DaoCard: React.FC<Props> = ({
  id,
  collectionName,
  cardImage,
  metrics,
  creator,
  animation,
  title,
  logo,
  tags,
  type,
  assetNumber,
  maxSupply,
  tags: { daoTypeTags = [], stage } = {},
  ...rest
}): JSX.Element | null => {
  const theme: any = useTheme()
  const navigate = useNavigate()

  return (
    <FlexBox
      onClick={() =>
        id &&
        navigate({
          pathname: `/entity/${id}/overview`,
        })
      }
      $direction='column'
      width='100%'
      $borderRadius={'10px'}
      height='100%'
      overflow='hidden'
      cursor='pointer'
      hover={{ $boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)' }}
    >
      <Skeleton visible={!cardImage}>
        <FlexBox
          position='relative'
          background={`url(${getCDNURL(cardImage)})`}
          width='100%'
          height='200px'
          $backgroundSize='cover'
          $backgroundPosition='center'
        >
          <FlexBox $gap={1} $alignItems='center' height='24px' margin='10px'>
            <FlexBox background={'#20798C'} $borderRadius={'100%'}>
              {getEntityIcon(type)}
            </FlexBox>

            {daoTypeTags?.tags?.map((tag: any) => (
              <FlexBox
                $zIndex={1}
                key={`${tag}`}
                background={'#20798C'}
                $borderRadius={'100px'}
                color='white'
                px={2}
                py={1}
              >
                <Typography size='sm'>{tag}</Typography>
              </FlexBox>
            ))}
          </FlexBox>
          <FlexBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
            {animation && (
              <Lottie
                width={150}
                height={150}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animation,
                }}
              />
            )}
          </FlexBox>
        </FlexBox>
      </Skeleton>
      <FlexBox width='100%' $direction='column' background={theme.ixoWhite} p={2} style={{ flex: 1 }}>
        <FlexBox $direction='column' $justifyContent='space-between' width='100%' height='100%' pt={2}>
          <FlexBox $justifyContent='space-between' width='100%'>
            <FlexBox $direction='column' $justifyContent='center'>
              <Skeleton visible={!title}>
              <Typography color='color-2' weight='normal' size='sm' style={{ marginBottom: 4 }}>
                {title}
              </Typography>
              </Skeleton>
              <Skeleton visible={!collectionName}>
              <Typography color='black' weight='bold' size='md'>
                {collectionName}
              </Typography>
              </Skeleton>
            </FlexBox>
            <FlexBox
              width='32px'
              height='32px'
              $borderRadius='100%'
              background={`url(${logo}), ${theme.ixoGrey100}`}
              $backgroundSize='100%'
            />
          </FlexBox>
          <HorizontalLine color={theme.ixoGrey100} margin='0' />

          <FlexBox $direction='column' $gap={1} width='100%' mb={2}>
            <FlexBox $gap={1} $alignItems='baseline'>
              <Typography size='md' color='black' transform='uppercase' weight='bold'>
                {thousandSeparator(metrics?.members, ',')}
              </Typography>
              <Typography size='md' color='black' weight='bold'>
                members
              </Typography>
            </FlexBox>

            <FlexBox $gap={1} $alignItems='baseline'>
              <Typography size='sm' color='green'>
                {thousandSeparator(metrics?.proposals, ',')}
              </Typography>
              <Typography size='sm' color='grey700'>
                {thousandSeparator(metrics?.activeProposals, ',')} active proposals
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
