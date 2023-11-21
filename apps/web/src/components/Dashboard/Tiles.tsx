import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'
import ThreeDot from 'assets/icons/ThreeDot'

export interface TileProps {
  to?: string
  title: ReactNode
  value: ReactNode
  subtle: ReactNode
  icon?: ReactNode
}

const DotsContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 1;
  transition: opacity 0.3s;

  @media (max-width: ${deviceWidth.mobile}px) {
    right: 0.5rem;
    top: 0.5rem;
  }
`

const StyledLink = styled(NavLink)`
  background: linear-gradient(180deg, #ffffff 0%, #f0f3fa 100%);
  border: 1px solid transparent;
  box-sizing: border-box;
  box-shadow: 0px 4px 25px -1px #e1e5ec;
  border-radius: 4px;
  flex: 1 1 0px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  text-decoration: none !important;
  transition: 0.5s border;
  margin: 1rem 0.625rem;
  position: relative;

  &.active {
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    max-width: 46%;
    min-width: 10rem;
    flex-basis: 0;
    margin-left: 6px;
    margin-right: 6px;
    margin: 0.625rem 0.375rem;
    padding: 0.625rem 0.5rem;
    line-height: 1.25;
  }
`

const Title = styled.div`
  font-size: 19px;
  color: #01283b;
  font-weight: normal;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 10px;
  }
`

const Value = styled.div`
  color: ${(props): string => props.theme.highlight.light};
  font-size: 27px;
  margin-right: 0.25rem;
  font-weight: 400;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 23px;
  }
`

const Subtle = styled.div`
  color: #01283b;
  font-size: 12px;
  font-weight: normal;
  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 10px;
  }
`
const Icon = styled.div`
  color: #fff;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  font-size: 14px;

  @media (max-width: ${deviceWidth.mobile}px) {
    margin-right: 0.5rem;
  }
`

export const Tile: React.FunctionComponent<TileProps> = ({ to = '#', title, value, subtle, icon }) => {
  if (icon) {
    return (
      <StyledLink to={to} end>
        <div className='d-flex w-full'>
          <Icon>{icon}</Icon>
          <div style={{ textAlign: 'left' }}>
            <Title>{title}</Title>
            <Value>{value}</Value>
            <Subtle>{subtle}</Subtle>
          </div>
        </div>
        {to ? (
          <DotsContainer>
            <ThreeDot />
          </DotsContainer>
        ) : null}
      </StyledLink>
    )
  }

  return (
    <StyledLink to={to} end>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Subtle>{subtle}</Subtle>
      <DotsContainer>
        <ThreeDot />
      </DotsContainer>
    </StyledLink>
  )
}

export interface TilesProps {
  tiles: TileProps[]
}

const TilesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Tiles: React.FunctionComponent<TilesProps> = ({ tiles }) => {
  return (
    <TilesContainer>
      {tiles.map((tile, key) => (
        <Tile {...tile} key={`tile-${key}`} />
      ))}
    </TilesContainer>
  )
}

export default Tiles
