import { Flex, FlexProps, Skeleton } from '@mantine/core'
import oracleDefault from '/public/assets/entities/oracleDefault.jpg'
import { Typography } from 'components/Typography'
import React from 'react'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useMantineTheme } from '@mantine/core'
import { thousandSeparator } from 'utils/formatters'
import { getEntityIcon } from 'utils/getEntityIcon'

interface Props extends FlexProps {
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
  loading?: boolean
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
  loading,
  ...rest
}): JSX.Element | null => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const config = useAppSelector(selectEntityConfig)
  const design = config.UI?.explorer?.design

  return (
    <Flex
      onClick={() =>
        id &&
        navigate({
          pathname: `/entity/${id}/overview`,
        })
      }
      direction='column'
      h='100%'
      w='100%'
      style={{
        borderRadius: design?.card?.borderRadius ?? '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': { boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)' },
        border: design?.card?.border,
        boxShadow: design?.card?.boxShadow,
      }}
    >
      <Skeleton visible={!cardImage || loading}>
        <Flex
          pos='relative'
          bg={`url(${cardImage ?? oracleDefault})`}
          w='100%'
          h='200px'
          style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <Flex gap={1} align='center' h='24px' m='10px'>
            <Flex bg={'#20798C'} style={{ borderRadius: '100%' }}>
              {getEntityIcon(type)}
            </Flex>

            {daoTypeTags?.tags?.map((tag: any) => (
              <Flex
                key={`${tag}`}
                bg={'#20798C'}
                color='white'
                px={2}
                py={1}
                style={{ borderRadius: '100px', zIndex: 1 }}
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
      </Skeleton>
      <Flex w='100%' direction='column' bg={theme.colors.white[5]} p={2} style={{ flex: 1 }}>
        <Flex direction='column' justify='space-between' w='100%' h='100%' pt={2}>
          <Flex justify='space-between' align='center' w='100%'>
            <Flex direction='column' justify='center'>
              <Skeleton visible={!collectionName}>
                <Typography color='black' weight='bold' size='lg'>
                  {collectionName}
                </Typography>
              </Skeleton>
            </Flex>
            <Flex
              w='32px'
              h='32px'
              style={{
                borderRadius: '100%',
                background: `url(${logo}), ${theme.colors.gray[100]}`,
                backgroundSize: '100%',
              }}
            />
          </Flex>

          <Flex gap={1} align='baseline' m='0 0 32px 0'>
            <Typography size='md' color='black' transform='uppercase' weight='bold'>
              {thousandSeparator(metrics?.members, ',')}
            </Typography>
            <Typography size='md' color='black' weight='bold'>
              members
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
