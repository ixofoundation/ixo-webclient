import React from 'react'
import Lottie from 'react-lottie'
import { FlexBox, HTMLFlexBoxProps } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { thousandSeparator } from 'utils/formatters'
import { HorizontalLine } from 'components/HorizontalLine'
import { Tag } from 'components'
import { getEntityIcon } from 'utils/getEntityIcon'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { useNavigate } from 'react-router-dom'

interface Props extends HTMLFlexBoxProps {
  id: string
  collectionName?: string | null
  cardImage: string
  type: string
  metrics?: any
  creator: string
  tags: any[]
  animation: any
  title: any
  logo: string
  assetNumber: string | number
  maxSupply: string | number
}

export const ProjectCard: React.FC<Props> = ({
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
      <FlexBox
        position='relative'
        background={`url(${cardImage})`}
        width='100%'
        height='200px'
        $backgroundSize='100% 100%'
      >
        <FlexBox $gap={1} $alignItems='center' height='24px' margin='10px'>
          <FlexBox background={'#20798C'} $borderRadius={'100%'} color='white'>
            {getEntityIcon(type)}
          </FlexBox>

          {tags &&
            tags.length > 0 &&
            tags
              ?.find(({ category }: any) => category === 'Asset Type')
              ?.tags?.map((tag: any) => (
                <FlexBox
                  $zIndex={9}
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
      <FlexBox width='100%' $borderRadius='none'>
        <ProgressBar
          radius='none'
          total={metrics?.denominator}
          approved={metrics?.nominator}
          rejected={0}
          activeBarColor={theme.ixoLightGreen}
          height={8}
        />
      </FlexBox>
      <FlexBox width='100%' $direction='column' background={theme.ixoWhite} p={2}>
        <FlexBox width='100%'>
          <Typography color='black' size='sm' transform='uppercase'>
            {creator}
          </Typography>
        </FlexBox>

        <FlexBox $direction='column' $justifyContent='space-between' width='100%' height='100%' pt={2}>
          <FlexBox $justifyContent='space-between' width='100%'>
            <FlexBox $direction='column' $justifyContent='center'>
              <Typography color='black' weight='bold' size='lg' style={{ marginBottom: 4 }}>
                {collectionName}
              </Typography>
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
                {thousandSeparator(metrics?.nominator ?? 0, ',')} / {thousandSeparator(metrics?.denominator ?? 0, ',')}
              </Typography>
              <Typography size='md' color='black' weight='bold'></Typography>
            </FlexBox>

            <FlexBox $gap={1} $alignItems='baseline'>
              <Typography size='sm' color='green'>
                {metrics?.title}
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
            <Tag>forming</Tag>
            <Tag>forming</Tag>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
