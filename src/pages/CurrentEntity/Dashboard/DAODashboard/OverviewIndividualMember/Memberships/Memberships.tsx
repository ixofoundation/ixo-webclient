import { Box, FlexBox, GridContainer } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'

interface Props {
  assets: string[]
  projects: string[]
  investments: string[]
  daos: string[]
  selectedDao: string
  setSelectedDao: (dao: string) => void
}

const Memberships: React.FC<Props> = ({
  assets = [],
  projects = [],
  investments = [],
  daos = [],
  selectedDao,
  setSelectedDao,
}): JSX.Element => {
  const theme: any = useTheme()
  const [seeMoreDAOs, setSeeMoreDAOs] = useState(false)
  const [seeMoreProjects, setSeeMoreProjects] = useState(false)
  const [seeMoreInvestments, setSeeMoreInvestments] = useState(false)
  const [seeMoreCollections, setSeeMoreCollections] = useState(false)

  const renderDAOs = (): JSX.Element => {
    const length = daos.length
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
          DAOs
        </Typography>

        <FlexBox gap={2} flexWrap='wrap' width='100%'>
          {daos.slice(0, seeMoreDAOs ? length : 6).map((item, index) => (
            <FlexBox
              key={index}
              width='calc(33% - 6px)'
              alignItems='center'
              padding={1}
              borderRadius='100px'
              background={selectedDao === item ? theme.ixoNewBlue : theme.ixoDarkBlue}
              gap={1.5}
              hover={{ background: theme.ixoNewBlue }}
              cursor='pointer'
              transition='all .2s'
              onClick={() => setSelectedDao(item)}
            >
              <Box>
                <Box
                  background={`url(${'https://random.imagecdn.app/50/50'}), ${theme.ixoGrey500}`}
                  width='24px'
                  height='24px'
                  backgroundSize='contain'
                  borderRadius='100%'
                  borderColor='white'
                  borderWidth='2px'
                  borderStyle='solid'
                />
              </Box>
              <Typography color='white' weight='medium' size='lg' overflowLines={1} style={{ width: '100%' }}>
                {item}
              </Typography>
            </FlexBox>
          ))}
          {length > 6 && (
            <FlexBox flexBasis='100%' cursor='pointer'>
              <Typography color='dark-blue' weight='medium' onClick={() => setSeeMoreDAOs(!seeMoreDAOs)}>
                {seeMoreDAOs ? '- see less' : '+ see more'}
              </Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    )
  }
  const renderProjects = (): JSX.Element => {
    const length = projects.length
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
          Projects
        </Typography>

        <FlexBox gap={2} flexWrap='wrap' width='100%'>
          {projects.slice(0, seeMoreProjects ? length : 6).map((item, index) => (
            <FlexBox
              key={index}
              width='calc(33% - 4px)'
              alignItems='center'
              padding={1}
              borderRadius='100px'
              background={theme.ixoDarkBlue}
              gap={1.5}
              hover={{ background: theme.ixoNewBlue }}
              cursor='pointer'
              transition='all .2s'
            >
              <Box>
                <Box
                  background={`url(${'https://random.imagecdn.app/50/50'}), ${theme.ixoGrey500}`}
                  width='24px'
                  height='24px'
                  backgroundSize='contain'
                  borderRadius='100%'
                  borderColor='white'
                  borderWidth='2px'
                  borderStyle='solid'
                />
              </Box>
              <Typography color='white' weight='medium' size='lg' overflowLines={1} style={{ width: '100%' }}>
                {item}
              </Typography>
            </FlexBox>
          ))}
          {length > 6 && (
            <FlexBox flexBasis='100%' cursor='pointer'>
              <Typography color='dark-blue' weight='medium' onClick={() => setSeeMoreProjects(!seeMoreProjects)}>
                {seeMoreProjects ? '- see less' : '+ see more'}
              </Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    )
  }
  const renderInvestments = (): JSX.Element => {
    const length = investments.length
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
          Investments
        </Typography>

        <FlexBox gap={2} flexWrap='wrap' width='100%'>
          {investments.slice(0, seeMoreInvestments ? length : 6).map((item, index) => (
            <FlexBox
              key={index}
              px={2}
              py={1}
              borderRadius='100px'
              background={theme.ixoDarkBlue}
              hover={{ background: theme.ixoNewBlue }}
              cursor='pointer'
              transition='all .2s'
            >
              <Typography color='white' weight='medium' size='lg' transform='uppercase'>
                {item}
              </Typography>
            </FlexBox>
          ))}
          {length > 6 && (
            <FlexBox flexBasis='100%' cursor='pointer'>
              <Typography color='dark-blue' weight='medium' onClick={() => setSeeMoreInvestments(!seeMoreInvestments)}>
                {seeMoreInvestments ? '- see less' : '+ see more'}
              </Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    )
  }
  const renderCollections = (): JSX.Element => {
    const length = assets.length
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
          Collections Owned
        </Typography>

        <FlexBox gap={2} flexWrap='wrap' width='100%'>
          {assets.slice(0, seeMoreCollections ? length : 6).map((item, index) => (
            <FlexBox
              key={index}
              px={2}
              py={1}
              borderRadius='100px'
              background={theme.ixoDarkBlue}
              hover={{ background: theme.ixoNewBlue }}
              cursor='pointer'
              transition='all .2s'
            >
              <Typography color='white' weight='medium' size='lg' transform='uppercase'>
                {item}
              </Typography>
            </FlexBox>
          ))}
          {length > 6 && (
            <FlexBox flexBasis='100%' cursor='pointer'>
              <Typography color='dark-blue' weight='medium' onClick={() => setSeeMoreCollections(!seeMoreCollections)}>
                {seeMoreCollections ? '- see less' : '+ see more'}
              </Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    )
  }
  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <Typography weight='medium' size='3xl'>
        Memberships
      </Typography>

      <GridContainer columns={2} rowGap={6} columnGap={6}>
        {renderDAOs()}
        {renderProjects()}
        {renderInvestments()}
        {renderCollections()}
      </GridContainer>
    </FlexBox>
  )
}

export default Memberships
