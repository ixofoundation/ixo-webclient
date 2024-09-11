import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'


import { useTheme } from 'styled-components'
import { useLocation } from 'react-router-dom'

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
  const theme: any = useTheme()
  const { hash } = useLocation()
  const selected = hash === `#${id}`

  return (
    <FlexBox
      id={id}
      $alignItems='center'
      $gap={4}
      padding={6}
      color={color}
      background={theme.ixoGradientDark2}
      $borderWidth={'1px'}
      $borderStyle='solid'
      $borderColor={selected ? color : '#0C3549'}
      $borderRadius='4px'
      position='relative'
      width='100%'
      $minWidth='180px'
      cursor='pointer'
      transition='all .2s'
      {...(selected ? { $boxShadow: `0px 0px 10px 0px ${color}AA` } : {})}
      {...(onClick ? { onClick } : {})}
    >
      {prefix && (
        <FlexBox>
          {typeof prefix === 'string' ? (
            <FlexBox $borderRadius='6px' padding={2} background={color}>
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
            </FlexBox>
          ) : (
            prefix
          )}
        </FlexBox>
      )}

      <FlexBox $direction='column' $gap={2}>
        <Typography variant='secondary' color='white' size='lg'>
          {header}
        </Typography>
        <Typography variant='secondary' size='3xl'>
          {body}
        </Typography>
        <Typography variant='secondary' color='white' size='sm' style={{ height: 22 }}>
          {footer}
        </Typography>
      </FlexBox>

      {onClick && (
        <SvgBox color='white' position='absolute' top='12px' right='8px'>
          <img src="/assets/images/icon-threedot.svg"  />
        </SvgBox>
      )}
    </FlexBox>
  )
}

export default Tab
