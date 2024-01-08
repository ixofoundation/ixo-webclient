import React from 'react'
import { ReactComponent as ShareIcon } from 'assets/images/icon-share-alt-square-solid.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/icon-telegram.svg'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const ShareCard: React.FC = () => {
  const theme: any = useTheme()
  const items = [
    {
      icon: <TelegramIcon />,
      onClick: () => {
        window.open('https://t.me/+eYI9xR6qQb9kZmU0')
      },
    },
  ]

  return (
    <FlexBox direction='column' gap={5} background='#ffffff' borderRadius='12px' p={5}>
      <FlexBox gap={2} alignItems='center'>
        <SvgBox svgWidth={4} svgHeight={4} color={theme.ixoNewBlue}>
          <ShareIcon />
        </SvgBox>
        <Typography variant='secondary' size='lg'>
          Share
        </Typography>
      </FlexBox>

      <FlexBox width='100%' gap={2} flexWrap='wrap'>
        {items.map((item, index) => (
          <FlexBox
            key={index}
            borderRadius='8px'
            background={theme.ixoGrey100}
            p={3}
            gap={2}
            alignItems='center'
            borderColor={'transparent'}
            borderWidth={'1px'}
            borderStyle={'solid'}
            hover={{ borderColor: theme.ixoNewBlue }}
            onClick={item.onClick}
            cursor='pointer'
          >
            <SvgBox svgWidth={5} svgHeight={5} color={theme.ixoBlack}>
              {item.icon}
            </SvgBox>
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  )
}

export default ShareCard
