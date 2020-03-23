import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'
import * as instanceSettings from '../../../../instance-settings'

export const HeroContainer = styled.div`
  background: url(${instanceSettings.getBGImageSrc()}) no-repeat center top;
  color: white;
  background-size: cover;
  margin: 0;
  font-weight: normal;
  padding: 2rem 1.5rem;
  display: flex;
  flex-flow: column wrap;
  @media (min-width: ${deviceWidth.tablet}px) {
    flex-flow: row wrap;
    padding: 3.75rem 5rem;
  }
`

export const BondsHeroHeading = styled.h1`
  color: white;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
`

export const StatusIndicator = styled.span`
  display: none;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.75rem;
  border-radius: 50%;
  background: ${/* eslint-disable-line */ props => props.theme.bg.green};
  @media (min-width: ${deviceWidth.tablet}px) {
    display: block;
  }
`

export const StatisticContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  padding: 0;

  &:last-child {
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    margin-top: 1rem;
  }
  i {
    font-size: 0.8125em;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    &.title-section {
      width: 70%;
    }
    &.description-section {
      width: 30%;
      justify-content: center;
      margin-top: 0;
    }
  }
`

export const OutcomeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 1.25rem;
`

export const Outcome = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #49bfe0;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 0.75rem;
  }
  i {
    font-size: 1.5em;
    margin-right: 0.25rem;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    &:not(:first-child) {
      display: none;
    }
  }
`
