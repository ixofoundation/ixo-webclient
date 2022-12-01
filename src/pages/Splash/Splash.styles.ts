import styled from 'styled-components'
import { default as BootstrapContainer } from 'react-bootstrap/Container'

import { deviceWidth } from 'constants/device'

export const ContentContainer = styled(BootstrapContainer)`
  @media (min-width: ${deviceWidth.desktopExtra}px) {
    max-width: 1250px;
  }
`
