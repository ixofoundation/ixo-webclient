import Image from 'next/image'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import React from 'react'
import { Typography } from 'components/Typography'
import { useMantineTheme } from '@mantine/core'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { IconAssistant } from 'components/IconPaths'


export interface ICardItems {
  icon?: React.ReactNode
  content: string | JSX.Element
  active?: boolean
  onClick?: () => void
}

interface Props {
  icon: JSX.Element
  title: JSX.Element | string
  columns: number
  items: ICardItems[] | JSX.Element
}

const Card: React.FC<Props> = ({ icon, title, columns, items }) => {
  const theme = useMantineTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.colors.blue[5]

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
          <Image src={IconAssistant} alt='Assistant' width={5} height={5} color={theme.colors.blue[5]} />
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
                $borderColor={item.active ? theme.colors.blue[5] : 'transparent'}
                $borderWidth={'1px'}
                $borderStyle={'solid'}
                hover={item.onClick ? { $borderColor: theme.colors.blue[5] } : {}}
                onClick={item.onClick && item.onClick}
                cursor={item.onClick && 'pointer'}
              >
                {item.icon && (
                  <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoBlack}>
                    {item.icon}
                  </SvgBox>
                )}
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
