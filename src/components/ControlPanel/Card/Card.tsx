import { FlexBox, GridContainer, SvgBox } from 'components/CoreEntry/App.styles'
import React from 'react'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'

export interface ICardItems {
  icon?: React.ReactNode
  content: string | JSX.Element
  active?: boolean
  withoutSvgBox?: boolean
  onClick?: () => void
}

interface Props {
  icon: JSX.Element
  title: JSX.Element | string
  columns: number
  items: ICardItems[] | JSX.Element
}

const Card: React.FC<Props> = ({ icon, title, columns, items }) => {
  const theme: any = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  return (
    <FlexBox
      width='100%'
      height='auto'
      $direction='column'
      $gap={5}
      background='#ffffff'
      $borderRadius='12px'
      p={5}
      mt={4}
    >
      <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
        <FlexBox $gap={2} $alignItems='center'>
          <SvgBox $svgWidth={5} $svgHeight={5} color={primaryColor}>
            {icon}
          </SvgBox>
          <Typography variant='secondary' size='lg'>
            {title}
          </Typography>
        </FlexBox>
        <SvgBox $svgWidth={6} $svgHeight={6} color={primaryColor}>
          <img src='/assets/images/icon-assistant.svg' />
        </SvgBox>
      </FlexBox>

      <GridContainer width='100%' height='100%' columns={columns} $gridGap={2}>
        {Array.isArray(items)
          ? items.map((item, index) => (
              <FlexBox
                key={index}
                $borderRadius='8px'
                background={item.onClick ? theme.ixoGrey100 : '#FCFCFC'}
                p={3}
                $gap={2}
                $alignItems='center'
                $borderColor={item.active ? theme.ixoNewBlue : 'transparent'}
                $borderWidth={'1px'}
                $borderStyle={'solid'}
                hover={item.onClick ? { $borderColor: theme.ixoNewBlue } : {}}
                onClick={item.onClick && item.onClick}
                cursor={item.onClick && 'pointer'}
              >
                {item.icon &&
                  (item.withoutSvgBox ? (
                    item.icon
                  ) : (
                    <SvgBox $svgWidth={5} $svgHeight={5}>
                      {item.icon}
                    </SvgBox>
                  ))}
                <Typography size='sm' color='black'>
                  {item.content}
                </Typography>
              </FlexBox>
            ))
          : items}
      </GridContainer>
    </FlexBox>
  )
}

export default Card
