import React from 'react'
import Lottie from 'react-lottie'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { Typography } from 'components/Typography'
import { Flex, FlexProps, useMantineTheme } from '@mantine/core'
import { thousandSeparator } from 'utils/formatters'
import { HorizontalLine } from 'components/HorizontalLine'
import { Tag } from 'components'
import { getEntityIcon } from 'utils/getEntityIcon'
import { useNavigate } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'

interface Props extends FlexProps {
  id?: string
  collectionName?: string | null
  cardImage: string
  type: string
  accountTokens?: any
  creator: string
  tags: any[]
  animation: any
  title: any
  logo: string
  assetNumber: string | number
  maxSupply: string | number
}

export const AssetCard: React.FC<Props> = ({
  collectionName,
  cardImage,
  accountTokens,
  creator,
  animation,
  title,
  logo,
  tags,
  type,
  assetNumber,
  maxSupply,
  id,
  ...rest
}): JSX.Element | null => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const config = useAppSelector(selectEntityConfig)
  const design = config.UI?.explorer?.design

  return (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: design?.card?.boxShadow,
        border: design?.card?.border,
      }}
      onClick={() =>
        navigate({
          pathname: `/entity/${id}/overview`,
        })
      }
    >
      <Flex
        pos='relative'
        bg={`url(${cardImage})`}
        w='100%'
        h='200px'
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Flex gap={1} align='center' h='24px' m='10px'>
          <Flex bg={'#20798C'} style={{ borderRadius: '100%' }} color='white'>
            {getEntityIcon(type)}
          </Flex>

          {tags &&
            tags.length > 0 &&
            tags
              ?.find(({ category }: any) => category === 'Asset Type')
              ?.tags?.map((tag: any) => (
                <Flex
                  style={{ zIndex: 9, borderRadius: '100px' }}
                  key={`${tag}`}
                  bg={'#20798C'}
                  color='white'
                  px={2}
                  py={1}
                >
                  <Typography size='sm'>{tag}</Typography>
                </Flex>
              ))}
        </Flex>
        <Flex pos='absolute' top='50%' left='50%' style={{ transform: 'translate(-50%, -50%)' }}>
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
        </Flex>
      </Flex>
      <Flex w='100%' style={{ borderRadius: 'none' }}>
        <ProgressBar
          radius='none'
          total={1800}
          approved={1200}
          rejected={accountTokens?.retired}
          activeBarColor={theme.colors.green[3]}
          height={8}
        />
      </Flex>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        bg={theme.colors.white[2]}
        p={2}
        style={{ borderRadius: '0px 0px 12px 12px', flex: 1 }}
      >
        <Flex w='100%'>
          <Typography color='black' size='xs'>
            {creator}
          </Typography>
        </Flex>

        <Flex direction='column' justify='space-between' w='100%' h='100%' pt={2}>
          <Flex justify='space-between' w='100%'>
            <Flex direction='column' justify='center'>
              <Typography color='black' weight='bold' size='md' style={{ marginBottom: 4 }}>
                {title}
              </Typography>
              <Typography color='color-2' weight='normal' size='sm'>
                {collectionName}
              </Typography>
            </Flex>
            <Flex
              w='32px'
              h='32px'
              style={{
                borderRadius: '100%',
                background: `url(${logo}), ${theme.colors.grey[1]}`,
                backgroundSize: '100%',
              }}
            />
          </Flex>
          <HorizontalLine color={theme.colors.grey[1]} margin='0' />

          <Flex direction='column' gap={1} w='100%' mb={2}>
            <Flex gap={1} align='baseline'>
              <Typography size='md' color='black' transform='uppercase' weight='bold'>
                {thousandSeparator(accountTokens?.produced, ',')}
              </Typography>
              <Typography size='md' color='black' weight='bold'>
                CARBON
              </Typography>
            </Flex>

            <Flex gap={1} align='baseline'>
              <Typography size='sm' color='green'>
                {thousandSeparator(accountTokens?.retired, ',')} retired
              </Typography>
              <Typography size='sm' color='grey700'>
                {thousandSeparator(accountTokens?.claimable, ',')} claimable
              </Typography>
            </Flex>
          </Flex>

          <Flex w='100%' justify='space-between' align='center'>
            <Tag>{thousandSeparator(accountTokens?.claimable, ',')} Carbon</Tag>
            <Tag>
              #{assetNumber}/{Number(maxSupply).toLocaleString()}
            </Tag>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
