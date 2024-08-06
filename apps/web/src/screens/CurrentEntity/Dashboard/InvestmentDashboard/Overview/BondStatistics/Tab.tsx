import Image from 'next/image'
import { Typography } from 'components/Typography'
import React from 'react'
import { Flex, useMantineTheme } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import { IconThreedot } from 'components/IconPaths'

interface Props {
  id: string
  prefix?: string | JSX.Element
  color: string
  header: string
  body: string
  footer: string
  onClick?: () => void
}

const Tab: React.FC<Props> = ({ id, prefix, color, header, body, footer, onClick }) => {
  const theme = useMantineTheme()
  const { hash } = useLocation()
  const selected = hash === `#${id}`

  return (
    <Flex
      id={id}
      align='center'
      gap={4}
      p={6}
      color={color}
      bg={theme.colors.blue[9]}
      style={{
        borderRadius: '4px',
        border: `1px solid ${selected ? color : '#0C3549'}`,
        cursor: 'pointer',
        transition: 'all .2s',
        boxShadow: selected ? `0px 0px 10px 0px ${color}AA` : '',
      }}
      pos='relative'
      w='100%'
      miw='180px'
      {...(onClick ? { onClick } : {})}
    >
      {prefix && (
        <Flex>
          {typeof prefix === 'string' ? (
            <Flex style={{ borderRadius: '6px', padding: '2px', background: color }}>
              <Typography
                variant='secondary'
                weight='bold'
                size='md'
                color='white'
                $wordBreak='break-all'
                $textAlign='center'
                style={{ inlineSize: '40px' }}
              >
                {prefix}
              </Typography>
            </Flex>
          ) : (
            prefix
          )}
        </Flex>
      )}

      <Flex direction='column' gap={2}>
        <Typography variant='secondary' color='white' size='lg'>
          {header}
        </Typography>
        <Typography variant='secondary' size='3xl'>
          {body}
        </Typography>
        <Typography variant='secondary' color='white' size='sm' style={{ height: 22 }}>
          {footer}
        </Typography>
      </Flex>

      {onClick && (
        <Flex color='white' pos='absolute' top='12px' right='8px'>
          <Image src={IconThreedot} alt='ThreeDot' width={5} height={5} color={theme.colors.blue[5]} />
        </Flex>
      )}
    </Flex>
  )
}

export default Tab
