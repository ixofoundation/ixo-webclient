import {  Flex, Text } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import ApplicationSubmissionCard from './ApplicationSubmissionCard'

const ClaimPanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  return (
    <Flex style={{ borderRadius: 12 }} direction={'column'}>
      <Flex align={'center'}>
        <SvgBox $svgWidth={5} $svgHeight={5} color={primaryColor}>
          <ClaimIcon />
        </SvgBox>
        <Text ml={10} fw='bold'>
          {data.profile?.name}
        </Text>
      </Flex>
      <ApplicationSubmissionCard data={data}/>
    </Flex>
  )
}

export default ClaimPanel
