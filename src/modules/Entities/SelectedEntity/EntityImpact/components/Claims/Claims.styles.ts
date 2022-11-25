import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const Section = styled.section`
  padding-bottom: 30px;
  border-bottom: 1px solid #164a63;
  margin-bottom: 30px;

  h2 {
    color: white;
    font-size: 30px;
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
    margin-bottom: 20px;

    i {
      font-size: 25px;
      margin-right: 10px;
    }

    i.icon-pending:before {
      color: #f89d28;
    }
    i.icon-approved:before {
      color: #5ab946;
    }
    i.icon-rejected:before {
      color: #e2223b;
    }
  }
`

export const Indicator = styled.div`
  width: 11px;
  height: 26px;
  border-radius: 54px;
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);

  background: ${/* eslint-disable-line */ (props) => props.color};
`

const Mail = styled.a``

export const Col = styled.div`
  font-size: 15px;
  font-weight: 300;

  a {
    color: white;
    text-decoration: none;
  }

  ${Mail} {
    color: #5094ac;
    text-decoration: none;
    display: block;
  }

  p {
    margin: 0;
  }

  ${Mail}:hover {
    color: white;
    font-weight: 600;
  }

  > a > div {
    position: relative;
    margin: 8px 0;
  }
`

export const ClaimsWidget = styled.div`
  margin: 20px 0 0;
`

export const ClaimTitle = styled.p`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${deviceWidth.mobile}px) {
    flex-direction: column;
  }
`

export const ID = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 1rem;
    font-weight: 700;
  }
`

export const Date = styled.span`
  font-weight: 300;
  font-size: 13px;
  color: #d6d3d3;
  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 0.625rem;
  }
`

export const Did = styled.p`
  && {color: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 0.625rem;
  }
`

export const ListItemWrapper = styled.div`
  background: #002d42;
  position: relative;
  margin-bottom: 10px;
  padding: 12px 25px;
  border: 1px solid #0c3549;

  transition: background 0.3s ease;

  :hover {
    background: #04364f;
  }

  p {
    font-size: 14px;
    color: white;
    margin-bottom: 0;
  }

  a {
    color: white;
  }

  a:hover {
    text-decoration: none;
  }
`

export const ClaimLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;

  :hover {
    text-decoration: none;
    color: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }
`

export const ViewAllLink = styled(ClaimLink)`
  text-align: center;
`
