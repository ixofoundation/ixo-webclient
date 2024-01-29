import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ReactComponent as ArrowRightIcon } from 'assets/images/icon-arrow-right.svg'

interface Props {
  icon: JSX.Element
  title: string
  description: string
}

const PropoverButton: React.FC<Props> = ({ icon, title, description }) => {
  const theme: any = useTheme()
  const [showPopover, setShowPopover] = useState(false)

  return (
    <FlexBox position='relative' onMouseEnter={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
      <SvgBox
        width='40px'
        height='40px'
        background='#F7F8F9'
        borderRadius='8px'
        svgWidth={5}
        svgHeight={5}
        color={theme.ixoNewBlue}
        justifyContent='center'
        alignItems='center'
        cursor='pointer'
      >
        {icon}
      </SvgBox>

      {showPopover && (
        <FlexBox
          position='absolute'
          top={'0px'}
          right={'0px'}
          borderRadius='12px'
          p={5}
          width='250px'
          gap={2}
          background={theme.ixoGrey300}
          direction='column'
        >
          <FlexBox alignItems='center' gap={2}>
            <SvgBox
              width='40px'
              height='40px'
              background={theme.ixoGrey100}
              borderRadius='8px'
              svgWidth={5}
              svgHeight={5}
              color={theme.ixoNewBlue}
              justifyContent='center'
              alignItems='center'
            >
              {icon}
            </SvgBox>
            <Typography size='md'>{title}</Typography>
          </FlexBox>

          <FlexBox width='100%' height='1px' background={theme.ixoGrey500} />

          <Typography size='sm'>{description}</Typography>

          <FlexBox width='100%' justifyContent='flex-end'>
            <FlexBox alignItems='center' gap={2} color={theme.ixoNewBlue} cursor='pointer'>
              <Typography size='sm'>View</Typography>
              <SvgBox svgWidth={6} svgHeight={6}>
                <ArrowRightIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default PropoverButton
