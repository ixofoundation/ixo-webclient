import styled from 'styled-components'
import { ProgressBar } from '../../common/ProgressBar'

export const OverviewContainer = styled.section`
  background: white;
  color: black;
  padding-bottom: 40px;
  hr {
    border: 1px solid #e8edee;
    width: 7.5rem;
    margin: 3.75rem auto;
    border-radius: 2px;
  }
  h3 {
    font-family: ${(props): string => props.theme.fontRoboto};
    margin: 2rem 0;
  }
`

export const ProjectImage = styled.img`
  width: 100%;
  box-shadow: 0px 10px 35px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 22px;
`

export const DarkBar = styled(ProgressBar)``

export const BarContainer = styled.div`
  text-align: right;

  div {
    height: 2px;
    background-color: #033c50;
  }

  div div {
    height: 4px;
    position: relative;
    top: -1px;
    z-index: 1;
  }

  span {
    font-size: 15px;
    color: white;
    font-weight: 400;
    background: ${(props): string => props.theme.ixoOrange};
    font-family: ${(props): string => props.theme.fontRobotoCondensed};
    padding: 0px 20px;
    border-radius: 3px;
    display: inline-flex;
    margin-bottom: 14px;
  }
`

export const Sidebar = styled.div`
  background: ${(props): string => props.theme.bg.gradientBlue};
  padding: 14px 15px 15px;
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.35);
  margin-bottom: 35px;

  hr {
    height: 1px;
    border-radius: 2px;
    background-color: #033c50;
  }
`

export const StatisticsContainer = styled.div`
  div {
    padding: 0;
  }
  span {
    font-size: 15px;
  }
`

export const Claims = styled.h4`
  font-weight: 100;
  font-size: 30px;
  margin: 15px 0 0;
  line-height: 1;

  strong {
    font-weight: 500;
  }
`
export const ImpactAction = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`

export const Disputed = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 100;

  strong {
    font-weight: bold;
  }
`

export const Text = styled.div`
  color: ${(props): string => props.theme.fontDarkGrey};
  font-size: 16px;
  line-height: 30px;
`

export const Hidden = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  opacity: 0;
  svg {
    margin: 0 8px;
    path {
      fill: #282828;
    }
    &:hover path {
      fill: #4ca0eb;
    }
  }
`

export const Visible = styled.div`
  svg {
    margin-right: 10px;
  }
  transition: opacity 0.3s ease;
`

export const LocalButton = styled.a`
  border: 1px solid #b8b8b8;
  &&& {
    color: ${(props): string => props.theme.fontGrey};
  }
  font-size: 16px;
  text-transform: uppercase;
  padding: 5px 20px;
  background: none;
  margin: 0 0 30px;
  width: 100%;
  font-family: ${/*eslint-disable-line*/ props =>
    props.theme.fontRobotoCondensed};
  font-weight: 500;
  display: inline-block;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  svg path {
    fill: ${(props): string => props.theme.fontGrey};
  }
  :hover {
    ${Visible} {
      opacity: 0;
    }
    ${Hidden} {
      opacity: 1;
    }
  }
`

export const BlueBold = styled.strong`
  color: ${(props): string => props.theme.ixoBlue};
`

export const AgentIcon = styled.i`
  :before {
    color: ${(props): string => props.theme.ixoBlue};
  }
`

export const ProfileCardsSection = styled.div`
  h3 {
    color: black;
    margin: 1.75rem 0;
  }
`
export const ProfileCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1.75rem -1.75rem 0;
`
