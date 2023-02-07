import {
  FlexBox,
  SvgBox,
  TableBody,
  TableBodyItem,
  TableContainer,
  TableHead,
  TableHeadItem,
  TableRow,
  theme,
} from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'

const ACTIVITIES = [
  {
    height: 1,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
  {
    height: 2,
    date: '23/09/2022',
    type: 'Submit Proposal',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
  {
    height: 3,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
  {
    height: 4,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
  {
    height: 5,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Failed',
  },
  {
    height: 6,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Failed',
  },
  {
    height: 7,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
  {
    height: 8,
    date: '23/09/2022',
    type: 'Vote',
    result: 'Success',
    hash: 'DVY22DA710CWV',
  },
]

interface Props {
  item?: any
}

const ParticipationActivity: React.FC<Props> = (): JSX.Element => {
  return (
    <FlexBox
      width='100%'
      background='white'
      borderColor={theme.ixoGrey300}
      borderStyle='solid'
      borderWidth='1px'
      padding={7.5}
      borderRadius='12px'
      direction='column'
      gap={3}
    >
      <Typography weight='medium' size='2xl'>
        Activity
      </Typography>

      <TableContainer width='100%' borderCollapse={'separate'} borderSpacing='0 0.5rem'>
        <TableHead>
          <TableRow>
            <TableHeadItem p={4}>
              <Typography size='lg' color='grey700'>
                #
              </Typography>
            </TableHeadItem>
            <TableHeadItem p={4}>
              <Typography size='lg' color='grey700'>
                Date
              </Typography>
            </TableHeadItem>
            <TableHeadItem p={4}>
              <Typography size='lg' color='grey700'>
                Type
              </Typography>
            </TableHeadItem>
            <TableHeadItem p={4}>
              <Typography size='lg' color='grey700'>
                Result
              </Typography>
            </TableHeadItem>
            <TableHeadItem p={4}>
              <Typography size='lg' color='grey700'>
                View
              </Typography>
            </TableHeadItem>
          </TableRow>
        </TableHead>
        <TableBody>
          {ACTIVITIES.map((item, index) => (
            <TableRow
              key={index}
              cursor='pointer'
              borderRadius={'12px'}
              hover={{ background: theme.ixoGrey100 }}
              transition='all .2s'
            >
              <TableBodyItem p={4}>
                <Typography weight='medium' size='lg'>
                  {item.height}
                </Typography>
              </TableBodyItem>
              <TableBodyItem p={4}>
                <Typography size='lg'>{item.date}</Typography>
              </TableBodyItem>
              <TableBodyItem p={4}>
                <Typography weight='medium' size='lg'>
                  {item.type}
                </Typography>
              </TableBodyItem>
              <TableBodyItem p={4}>
                <Typography size='lg'>{item.result}</Typography>
              </TableBodyItem>
              <TableBodyItem p={4}>
                {item.hash && (
                  <SvgBox color={theme.ixoNewBlue}>
                    <EyeIcon />
                  </SvgBox>
                )}
              </TableBodyItem>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </FlexBox>
  )
}

export default ParticipationActivity
