import { FlexBox } from 'components/App/App.styles'
import React from 'react'
import { TQuestion } from 'types/protocol'
import { Typography } from 'components/Typography'
import { ControlMaps } from 'components/ClaimQuestionControls/control-maps'

interface Props {
  no: number
  schema: TQuestion
  formData: any
  onChange: (formData: any) => void
}
const QuestionCard: React.FC<Props> = ({ no, schema, formData, onChange }) => {
  const Control = ControlMaps[schema.control]

  return (
    <FlexBox direction='column' width='100%' borderRadius='16px' background='#01273B' p={5} gap={6}>
      <FlexBox alignItems='center' gap={2}>
        <FlexBox
          alignItems='center'
          justifyContent='center'
          width='24px'
          height='24px'
          borderRadius='100%'
          background='#2B84A3'
        >
          <Typography size='sm' weight='bold'>
            {no}
          </Typography>
        </FlexBox>
        <Typography size='3xl'>{schema.title}</Typography>
      </FlexBox>

      <FlexBox height='24px'>
        <Typography size='xl'>{schema.description}</Typography>
      </FlexBox>

      <FlexBox width='100%'>{Control && <Control value={formData} onChange={onChange} {...schema} />}</FlexBox>
    </FlexBox>
  )
}

export default QuestionCard
