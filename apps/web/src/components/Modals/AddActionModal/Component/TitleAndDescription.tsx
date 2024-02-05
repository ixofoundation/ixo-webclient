import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import Tooltip from 'components/Tooltip/Tooltip'

interface Props {
  title: string
  description?: string
}

const TitleAndDescription: React.FC<Props> = ({ title, description }): JSX.Element => {
  return (
    <FlexBox $gap={2} $alignItems='center'>
      <Typography size='xl' weight='medium'>
        {title}
      </Typography>
      {description && (
        <Tooltip text={description} width='20rem'>
          <SvgBox color='black' $svgWidth={5} $svgHeight={5} cursor='pointer'>
            <InfoIcon />
          </SvgBox>
        </Tooltip>
      )}
    </FlexBox>
  )
}

export default TitleAndDescription
