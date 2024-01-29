import { Anchor, Flex, Text } from '@mantine/core'
import React from 'react'
import {
  selectEntityFooterUIConfig,
  selectEntityHeadTitleUIConfig,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'

const Footer: React.FC = () => {
  const footerConfig: any = useAppSelector(selectEntityFooterUIConfig)
  const title = useAppSelector(selectEntityHeadTitleUIConfig)

  const socials = footerConfig?.socials ?? {}
  const privacyPolicy = footerConfig?.privacyPolicy
  const address = footerConfig?.address

  return (
    <Flex
      pos='fixed'
      left={0}
      bottom={0}
      w='100vw'
      h='100px'
      p={32}
      align={'center'}
      justify={'space-between'}
      gap={16}
      c={'#FFFFFF'}
      bg={'rgba(0,0,0,0.8)'}
      style={{ backdropFilter: 'blur(5px)', zIndex: 9 }}
    >
      <Flex align={'center'} gap={16}>
        {title && <Text>{title}</Text>}
        {address && <Text>{address}</Text>}
        {privacyPolicy && (
          <Anchor href={privacyPolicy.href} target='_blank' color={'white'} underline={undefined}>
            <Text fw={'bold'}>{privacyPolicy.text}</Text>
          </Anchor>
        )}
        {/* <Text weight={'bold'}>Terms of Use</Text> */}
      </Flex>

      <Flex align={'center'} gap={4}>
        <Text fw={'bold'}>Powered by</Text>
        <Text color='ixo-blue' fw={'bold'}>
          ixo
        </Text>
      </Flex>

      <Flex gap={16} align={'center'}>
        {Object.values(socials).map((item: any, index: number) => (
          <Anchor
            key={index}
            href={item.href}
            target='_blank'
            underline={undefined}
            className={item.iconClassName}
            color={'white'}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default Footer
