import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import styled from 'styled-components'

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid ${(props): string => props.theme.ixoGrey300};
`

interface Props {
  type: string
  title: string
  description: string
  numOfQuestions: number
}

const ClaimCard: React.FC<Props> = ({ type, title, numOfQuestions }): JSX.Element => {
  return (
    <FlexBox
      direction='column'
      width='330px'
      filter={'drop-shadow(0px 4.64px 4.64px rgba(0, 0, 0, 0.25))'}
      borderRadius={'8px'}
      overflow={'hidden'}
      background='white'
    >
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
            {type}
          </Typography>
        </FlexBox>
        <FlexBox width='100%'>
          <Typography weight='bold' size='2xl' overflowLines={2} style={{ wordBreak: 'break-all', height: 54 }}>
            {title}
          </Typography>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={1}>
          {/* TODO: 26px */}
          <Typography color='grey700' size='3xl'>
            {numOfQuestions}
          </Typography>
          <Divider />
          <Typography color='grey700' size='sm'>
            Questions
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

export default ClaimCard
