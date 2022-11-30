import { Box } from 'common/components/App/App.styles'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 760px;
  width: 100%;
  margin: auto;
`

export const PageRow = styled.div`
  display: flex;
  width: 100%;
`

export const CardWidthBox = styled(Box)`
  min-width: 290px;
`

export const CollectionIcon = styled.div<{ background?: string }>`
  background: url(${(props): string => props.background!}) center center no-repeat;
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
`

export const CollectionImage = styled(CardWidthBox)<{ background?: string }>`
  background: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%) center center / cover
      no-repeat,
    url(${(props): string => props.background!}) center center no-repeat;
  background-size: cover;
  height: 190px;
  border-radius: 8px;
  padding: 10px;
`

export const SDGIcon = styled.i`
  font-size: 20px;
  color: white;
`

export const TokenMetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 440px;

  li {
    color: #828e94;
  }
`

export const TokenMetadataTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`
