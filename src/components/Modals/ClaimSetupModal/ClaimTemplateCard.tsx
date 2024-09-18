import { Box } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { TEntityClaimTemplateModel } from 'types/entities'

const Wrapper = styled.div<{ selected?: boolean }>`
  width: 340px;
  height: 270px;
  padding: 20px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  ${(props): string =>
    props.selected
      ? 'box-shadow: 0px 0px 20px rgba(0, 210, 255, 0.5);'
      : 'box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);'}
  border-radius: 10px;
  background: ${(props): string => props.theme.ixoWhite};
`

const Divider = styled.div`
  width: 100%;
  margin: 10px 0px;
  border-top: 1px solid ${(props): string => props.theme.ixoGrey300};
`

interface ClaimTemplateProps {
  template: TEntityClaimTemplateModel | undefined
  selected?: boolean
  onClick?: () => void
}
const ClaimTemplateCard: React.FC<ClaimTemplateProps> = ({ template, selected = false, onClick }): JSX.Element => {
  return (
    <Wrapper selected={selected} className='cursor-pointer' onClick={onClick && onClick}>
      {!template && (
        <Box className='d-flex align-items-center justify-content-center h-100'>
          <Typography size='xl' color='blue' weight='medium'>
            Select a Claim Protocol
          </Typography>
        </Box>
      )}
      {template && (
        <Box className='d-flex flex-column h-100'>
          <Box>
            <Typography color='grey700'>{template.type}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography size='xl' weight='bold' className='pb-2'>
              {template.title}
            </Typography>
          </Box>
          <Box className='h-100'>
            <Typography $overflowLines={6} size='sm'>
              {template.description}
            </Typography>
          </Box>
          <Divider />
          <Box className='d-flex justify-content-between'>
            <Typography color='grey700' size='sm'>
              {template.creator}
            </Typography>
            <Typography color='grey700' size='sm'>
              Created {moment(template.createdAt).format('DD-MMM-YYYY')}
            </Typography>
          </Box>
        </Box>
      )}
    </Wrapper>
  )
}

export default ClaimTemplateCard
