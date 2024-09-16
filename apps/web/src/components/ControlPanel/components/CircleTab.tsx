import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useCompanionDesignConfig } from 'hooks/userInterface/useCompanionDesignConfig'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  active?: boolean
  icon: JSX.Element
  badge?: number
  onClick?: () => void
}

const CircleTab: React.FC<Props> = ({ active, icon, badge = 0, onClick }) => {
  const theme: any = useTheme()
  const { toolbarActiveBackground, toolbarActiveColor, toolbarBackground, toolbarColor } = useCompanionDesignConfig()

  return (
    <SvgBox
      position='relative'
      background={active ? toolbarActiveBackground : toolbarBackground}
      color={active ? toolbarActiveColor : toolbarColor}
      $borderRadius='100%'
      width='46px'
      height='46px'
      {...(onClick && { onClick })}
      $svgWidth={7}
      $svgHeight={7}
      $justifyContent='center'
      $alignItems='center'
      cursor={'pointer'}
    >
      {icon}
      {badge > 0 && (
        <FlexBox
          position='absolute'
          top={'0px'}
          right={'0px'}
          transform='translate(25%, -25%)'
          background={theme.ixoNewBlue}
          color={theme.ixoWhite}
          width='24px'
          height='24px'
          $borderRadius='100%'
          $justifyContent='center'
          $alignItems='center'
        >
          <Typography size='sm'>{badge}</Typography>
        </FlexBox>
      )}
    </SvgBox>
  )
}
export default CircleTab
