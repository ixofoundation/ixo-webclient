import { Box, Card, Flex, Text } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import { startCase, truncate, upperFirst } from 'lodash'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import AssistantIcon from 'assets/images/icon-assistant.svg'
import { useTheme } from 'styled-components'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { transformStorageEndpoint } from '@ixo-webclient/utils'

const KeyValuePanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const renderValue = (data: any, key: string) => {
    // if (key === 'file') {
    //   return (
    //     <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 5 }}>
    //       <object className='pdfIframe' data={serviceEndpointToUrl(data[key], service)}></object>
    //     </Flex>
    //   )
    // }

    if (data[key] === undefined || data[key]?.length <= 0)
      return (
        <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }}>
          <Text ml={25} size='sm'>
            {'N/A'}
          </Text>
        </Flex>
      )

      return (
        <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }} align={"center"}>
          <Text ml={25} size='sm'>
            {truncate(data[key], { length: 30 })}{' '}
          </Text>
          {key === 'serviceEndpoint' && (
            <a target='_blank' rel='noopener noreferrer' href={transformStorageEndpoint(data[key])} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <LiaExternalLinkAltSolid size={24} style={{ verticalAlign: 'middle' }} />
            </a>
          )}
        </Flex>
      )
  }

  return (
    <Box>
      <Card>
        <Flex align={'center'} justify={'space-between'}>
          <Text ml={10}>{upperFirst(data?.id.split('#')[1])}</Text>
          <SvgBox $svgWidth={6} $svgHeight={6} color={primaryColor}>
            <AssistantIcon />
          </SvgBox>
        </Flex>
        <Box w='100%' mt={15}>
          {Object.keys(data).map((key) => (
            <Box key={key} w='100%'>
              <Flex p={10}>
                <Text ml={25} w='100%' size='sm'>
                  {startCase(key)}
                </Text>
              </Flex>
              {renderValue(data, key)}
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  )
}

export default KeyValuePanel
