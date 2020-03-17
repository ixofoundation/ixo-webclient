import * as React from 'react'
import styled from 'styled-components'
import { getCountryName } from '../../../common/utils/formatters'
import Location from '../../../assets/icons/Location'
import World from '../../../assets/icons/World'

const Text = styled.div`
  color: ${/*eslint-disable-line*/ props => props.theme.fontDarkGrey};
  font-size: 16px;
  line-height: 30px;
`

const FounderContainer = styled.section`
  padding: 50px 0;
`

const IconText = styled.p``

const Founder = styled.div`
  background: white;

  h3,
  h4 {
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
  }

  h3 {
    font-size: 30px;
  }

  h4 {
    font-size: 16px;
    color: ${/*eslint-disable-line*/ props => props.theme.darkGrey};
  }

  img {
    margin-top: 20px;
  }

  ${IconText} {
    margin-top: 10px;
    color: #333c4e;
    font-size: 14px;
    font-family: ${/*eslint-disable-line*/ props => props.theme.fontRoboto};
    svg {
      margin-right: 5px;
      path {
        fill: #333c4e;
      }
    }
    span {
      display: block;
      margin: 0 15px 10px 0;
    }

    @media (min-width: 400px) {
      span {
        display: inline;
      }
    }
  }
`

export interface Founder {
  logoLink?: string
  name?: string
  shortDescription?: string
  countryOfOrigin?: string
  websiteURL?: string
}

export interface ParentProps {
  founder: Founder
}

export const ProjectFounder: React.SFC<ParentProps> = ({ founder }) => {
  const renderLogo = (): JSX.Element => {
    if (founder.logoLink !== '') {
      return <img src={founder.logoLink} alt="" />
    } else {
      return <span />
    }
  }

  return (
    <FounderContainer className="container-fluid">
      <div className="container">
        <Founder className="row">
          <div className="col-md-8">
            {founder.name && <h4>Project Founder</h4>}
            <h3>{founder.name}</h3>
            <Text>{founder.shortDescription}</Text>
            <IconText>
              {founder.countryOfOrigin && (
                <span>
                  <Location width="14" />
                  {getCountryName(founder.countryOfOrigin)}
                </span>
              )}
              {founder.websiteURL && (
                <span>
                  <World width="14" />
                  <a
                    href={founder.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {founder.websiteURL}
                  </a>
                </span>
              )}
            </IconText>
          </div>
          <div className="col-md-4">{renderLogo()}</div>
        </Founder>
      </div>
    </FounderContainer>
  )
}
