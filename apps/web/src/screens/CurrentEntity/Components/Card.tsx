import { FlexBox, HTMLFlexBoxProps, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { ReactNode } from 'react'


import { useTheme } from 'styled-components'

interface Props extends HTMLFlexBoxProps {
  icon?: JSX.Element
  iconNode?: JSX.Element
  label: string
  actionIcon?: JSX.Element
  onAction?: () => void
  children?: ReactNode
}

const Card: React.FC<Props> = ({
  icon,
  label,
  actionIcon = <img src="/assets/images/icon-expand-alt.svg"  />,
  onAction,
  children,
  iconNode,
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <FlexBox
      $direction='column'
      width={'100%'}
      height='100%'
      background={'#152B3F'}
      $borderRadius={'4px'}
      p={5}
      $gap={6}
      {...rest}
    >
      {/* Card Header */}
      <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
        <FlexBox $alignItems='center' $gap={2}>
          {icon && (
            <SvgBox color='white' $svgWidth={4.5} $svgHeight={4.5}>
              {icon}
            </SvgBox>
          )}
          {iconNode && iconNode}
          <Typography variant='secondary' color='white' size='lg'>
            {label}
          </Typography>
        </FlexBox>
        {onAction && (
          <SvgBox color={theme.ixoDarkBlue} $svgWidth={6} cursor='pointer' onClick={onAction}>
            {actionIcon}
          </SvgBox>
        )}
      </FlexBox>
      {children}
    </FlexBox>
  )
}

export default Card
