import Image from 'next/image'
import { ActionIcon, Anchor, Flex, Text, Tooltip } from '@mantine/core'
import React, { useState } from 'react'
import { selectEntityFooterUIConfig, selectEntityHeadTitleUIConfig } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import styled from 'styled-components'
import { IconInfo } from 'components/IconPaths'


const StyledAnchor = styled(Anchor)`
  color: var(--mantine-color-white);
  &:hover {
    color: var(--mantine-color-ixo-blue-6);
  }
`

const Footer: React.FC = () => {
  const footerConfig: any = useAppSelector(selectEntityFooterUIConfig)
  const title = useAppSelector(selectEntityHeadTitleUIConfig)
  const [collapse, setCollapse] = useState(false)

  const socials = footerConfig?.socials ?? {}
  const privacyPolicy = footerConfig?.privacyPolicy
  const address = footerConfig?.address

  return (
    <>
      <Flex pos={'fixed'} left={40} bottom={24} style={{ transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <Tooltip label='Toggle Footer' position='right'>
          <ActionIcon variant='filled' aria-label='Footer' radius={'100%'} onClick={() => setCollapse((v) => !v)}>
            <SvgBox color='white' $svgWidth={6} $svgHeight={6}>
              <Image src={IconInfo} alt='Info' width={5} height={5} color={theme.colors.blue[5]} />
            </SvgBox>
          </ActionIcon>
        </Tooltip>
      </Flex>

      <Flex
        pos='fixed'
        left={0}
        bottom={collapse ? 0 : -100}
        w='100vw'
        h={100}
        p={32}
        align={'center'}
        justify={'space-between'}
        gap={16}
        c={'#FFFFFF'}
        bg={'rgba(0,0,0,0.5)'}
        style={{ backdropFilter: 'blur(5px)', zIndex: 9, transition: '.2s' }}
      >
        <Flex align={'center'} gap={16} ml={48}>
          {title && <Text>{title}</Text>}
          {address && <Text>{address}</Text>}
          {privacyPolicy && (
            <StyledAnchor href={privacyPolicy.href} target='_blank' underline={'never'}>
              <Text fw={'bold'}>{privacyPolicy.text}</Text>
            </StyledAnchor>
          )}
          {/* <Text weight={'bold'}>Terms of Use</Text> */}
        </Flex>

        <Flex align={'center'} gap={4}>
          <Text fw={'bold'}>Powered by</Text>
          <Text
            c='ixo-blue'
            fw={'bold'}
            onClick={() => window.open('https://ixo.world', '_blank', 'noopener')}
            style={{ cursor: 'pointer' }}
          >
            ixo
          </Text>
        </Flex>

        <Flex gap={16} align={'center'}>
          {Object.values(socials).map((item: any, index: number) => (
            <StyledAnchor
              key={index}
              href={item.href}
              target='_blank'
              underline={'never'}
              className={item.iconClassName}
            />
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
