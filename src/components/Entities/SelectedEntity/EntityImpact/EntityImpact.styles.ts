import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const DetailContainer = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoDarkestBlue};
  display: block;
  flex: 1 1 auto;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`

export const Loading = styled.div`
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoDarkestBlue};
  padding: 50px 20px;
`
export const ContentContainer = styled.div`
  flex-grow: 1;
  background: ${(props) => props.theme.ixoDarkestBlue};
  max-width: 100%;

  @media (min-width: ${deviceWidth.mobile}px) {
    max-width: calc(100% - 75px);
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

export const EntityHeroContainer = styled.div<{ light?: boolean }>`
  padding-left: 15px;
  padding-right: 15px;
  background: ${(props: any): string => (props.light ? 'white' : 'inherit')};
  @media (min-width: ${deviceWidth.mobile}px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`
