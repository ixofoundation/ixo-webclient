import { FlexBox, SvgBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { Button } from 'screens/CreateEntity/Components'
import React from 'react'

import CheckCircleIcon from 'assets/images/icon-check-circle.svg'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'

interface Props {
  hidden?: boolean
  onSubmit: () => void
}

const ClaimCollectionCreationSuccessStep: React.FC<Props> = ({ hidden, onSubmit }) => {
  const theme: any = useTheme()

  if (hidden) {
    return null
  }

  return (
    <FlexBox $direction='column'>
      <FlexBox $direction='column' $gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <SvgBox $svgWidth={30} $svgHeight={30} color={theme.ixoLightGreen}>
          <CheckCircleIcon />
        </SvgBox>

        <Typography color='green'>Claim Collection successfully created!</Typography>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />
      </FlexBox>

      <FlexBox $gap={5}>
        <Button variant='primary' size='flex' width={300} onClick={onSubmit}>
          Back to Dashboard
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationSuccessStep
