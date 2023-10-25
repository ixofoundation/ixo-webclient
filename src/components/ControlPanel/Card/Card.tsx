import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import React from 'react'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

export interface ICardItems {
  icon?: JSX.Element
  content: string | JSX.Element
  active?: boolean
  onClick?: () => void
}

interface Props {
  icon: JSX.Element
  title: string
  columns: number
  items: ICardItems[]
}

const Card: React.FC<Props> = ({ icon, title, columns, items }) => {
  const theme: any = useTheme()

  return (
    <FlexBox direction='column' gap={5} background='#ffffff' borderRadius='12px' p={5}>
      <FlexBox gap={2} alignItems='center'>
        <SvgBox svgWidth={4} svgHeight={4} color={theme.ixoNewBlue}>
          {icon}
        </SvgBox>
        <Typography variant='secondary' size='lg'>
          {title}
        </Typography>
      </FlexBox>

      <GridContainer width='100%' columns={columns} gridGap={2}>
        {items.map((item, index) => (
          <FlexBox
            key={index}
            borderRadius='8px'
            background={item.onClick ? theme.ixoGrey100 : '#FCFCFC'}
            p={3}
            gap={2}
            alignItems='center'
            borderColor={item.active ? theme.ixoNewBlue : 'transparent'}
            borderWidth={'1px'}
            borderStyle={'solid'}
            hover={item.onClick ? { borderColor: theme.ixoNewBlue } : {}}
            onClick={item.onClick && item.onClick}
            cursor={item.onClick && 'pointer'}
          >
            {item.icon && (
              <SvgBox svgWidth={5} svgHeight={5} color={theme.ixoBlack}>
                {item.icon}
              </SvgBox>
            )}
            <Typography size='sm' color='black'>
              {item.content}
            </Typography>
          </FlexBox>
        ))}
      </GridContainer>
    </FlexBox>
  )
}

export default Card
