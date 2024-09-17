import { deviceWidth } from 'constants/device'
import styled from 'styled-components'

export const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: Roboto;
  width: 100%;
  color: #282828;
  margin-bottom: 40px;
  line-height: 45px;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 38px;
  }
`

export const CollectionContainer = styled.div`
  padding: 100px 0 75px;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 60px 0 40px;
  }
`

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 0;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${deviceWidth.tablet}px) {
    padding: 3px 0;
  }
`

interface CardProps {
  backgroundcolor: string | '#282828'
}

export const Card = styled.a<CardProps>`
  overflow: hidden;
  width: 300px;
  height: 130px;
  background-color: ${/* eslint-disable-line */ (props) => props.backgroundcolor};
  border-radius: 8px;
  position: relative;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  :hover {
    img {
      width: 110%;
    }
  }
`

export const CardImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  transition: all 0.3s ease;
`
