import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  active?: boolean
  icon: JSX.Element
  badge?: number
  onClick?: () => void
}

const CircleTab: React.FC<Props> = ({ active, icon, badge, onClick }) => {
  const theme: any = useTheme()
  return (
    <SvgBox
      position='relative'
      background={active ? theme.ixoNewBlue : theme.ixoWhite}
      color={active ? theme.ixoWhite : theme.ixoNewBlue}
      borderRadius='100%'
      width='46px'
      height='46px'
      {...(onClick && { onClick })}
      svgWidth={7}
      svgHeight={7}
      justifyContent='center'
      alignItems='center'
      cursor={'pointer'}
    >
      {icon}
      {badge && (
        <FlexBox
          position='absolute'
          top={'0px'}
          right={'0px'}
          transform='translate(25%, -25%)'
          background={theme.ixoNewBlue}
          color={theme.ixoWhite}
          width='24px'
          height='24px'
          borderRadius='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Typography size='sm'>{badge}</Typography>
        </FlexBox>
      )}
    </SvgBox>
  )
}
export default CircleTab
