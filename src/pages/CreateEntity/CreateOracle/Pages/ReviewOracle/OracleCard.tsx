import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'

interface Props {
  image: string
  name: string
}

const OracleCard: React.FC<Props> = ({ image, name }): JSX.Element => {
  return (
    <FlexBox
      direction='column'
      width='330px'
      filter={'drop-shadow(0px 4.64px 4.64px rgba(0, 0, 0, 0.25))'}
      borderRadius={'8px'}
      overflow={'hidden'}
      background='white'
    >
      <Box width='100%' height='170px' background={`url(${image})`} backgroundSize='cover' />
      <FlexBox padding={4} direction='column' gap={4} width='100%'>
        <FlexBox
          justifyContent='space-between'
          borderRadius='8px'
          background={'#5197B6'}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <Typography size='md' weight='semi-bold' color='white'>
            Oracle
          </Typography>
        </FlexBox>
        <FlexBox width='100%'>
          <Typography weight='bold' size='2xl' overflowLines={2} style={{ wordBreak: 'break-all', height: 54 }}>
            {name}
          </Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography color='grey700' size='md'>
            Creation Date:
          </Typography>
          <Typography size='md'>
            {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default OracleCard
