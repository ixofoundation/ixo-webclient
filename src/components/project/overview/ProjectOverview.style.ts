import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'
import { ProgressBar } from '../../../common/components/ProgressBar'

export const CaptionImageWrapper = styled.div``

export const OverviewContainer = styled.section`
  background: white;
  color: black;
  padding-bottom: 40px;
  line-height: 2;
  hr {
    border: 1px solid #e8edee;
    width: 7.5rem;
    margin: 3.75rem auto;
    border-radius: 2px;
  }
  img {
    max-width: 100%;
  }
  h2 {
    margin: 2rem 0;
  }
  h3 {
    font-size: 1.375rem;
    font-weight: bold;
    font-family: ${(props): string => props.theme.fontRoboto};
    margin: 0.75rem 0;
  }
  .content-section {
    > p:first-of-type::first-letter {
      float: left;
      background: #e8edee;
      padding: 0.5rem 1.125rem;
      border-radius: 4px;
      font-family: ${(props): string => props.theme.fontRobotoCondensed};
      font-weight: normal;
      font-size: 2.8125rem;
      line-height: 1;
      margin-right: 0.5rem;
    }
  }
  .content-section ~ .content-section {
    background: none;
    p {
      color: inherit;
      line-height: inherit;
      &::first-letter {
        background: none;
        padding: 0;
        border-radius: none;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        margin-right: 0;
      }
    }
  }
  .content-section {
    .table-wrapper {
      overflow-x: scroll;
      table.table {
        width: max-content;
        max-width: none;
      }
    }
    table.table thead th,
    table.table td {
      border: none;
    }
    table.table thead th {
      font-weight: normal;
      color: #93979d;
      font-size: 0.75rem;
    }
    table.table td {
      font-weight: bold;
      font-size: 0.875rem;
      letter-spacing: 0.3px;
      color: #000000;
    }
    ${CaptionImageWrapper} {
      p {
        font-size: 0.75rem;
        line-height: 2;
        margin-top: 1rem;
        color: #a5adb0;
      }
    }
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
  .react-md {
    img {
      max-width: 100%;
    }
    .first-letter {
      font-size: 2em;
      line-height: 1.75;
      margin-right: 0.75rem;
      padding: 0 1.125rem;
      background: #e8edee;
      border-radius: 4px;
      float: left;
    }
  }
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

export const ProfileCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1.75rem -1.75rem 0;
`
export const InlineImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  img,
  p {
    flex: 1 1 auto;
    width: 100%;
  }
  img {
    height: intrinsic;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  p {
    :last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    img {
      width: 50%;
      margin-bottom: 0;
    }
    p {
      width: calc(50% - 1.35rem);
      margin-left: 1.25rem;
    }
  }
`
