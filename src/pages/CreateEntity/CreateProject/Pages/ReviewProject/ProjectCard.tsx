import { Box, FlexBox } from 'components/App/App.styles'
import { CardTag, CardTags } from 'components/Entities/EntitiesExplorer/Components/EntityCard/EntityCard.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  image: string
  name: string
  endDate: string
  logo: string
  maxSubmission: number
}

const ProjectCard: React.FC<Props> = ({ image, name, endDate, logo, maxSubmission }): JSX.Element => {
  const theme: any = useTheme()

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
        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <CardTags style={{ gap: 5 }}>
            <CardTag tagColor={'#5197B6'}>Project</CardTag>
          </CardTags>
          <Box borderRadius='50%'>
            <img width={40} height={40} src={logo} alt='' />
          </Box>
        </FlexBox>
        <FlexBox width='100%'>
          <Typography weight='bold' size='2xl' overflowLines={2} style={{ wordBreak: 'break-all', height: 54 }}>
            {name}
          </Typography>
        </FlexBox>

        <FlexBox background={theme.ixoGrey300} borderRadius='50px' width='100%' height='10px' />

        <FlexBox direction='column' width='100%' gap={1}>
          {/* TODO: 26px */}
          <Typography size='3xl'>0/{maxSubmission}</Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography color='grey700' size='md'>
            Closing Date:
          </Typography>
          {endDate && (
            <Typography size='md'>
              {new Date(endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}
            </Typography>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ProjectCard
