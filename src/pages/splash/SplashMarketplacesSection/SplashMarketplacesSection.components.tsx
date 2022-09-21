import { deviceWidth } from 'lib/commonData'
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
  padding: 50px 0;
  background: #f6f6f6;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0;
    padding-top: 30px;
  }
`

export const CardsContainer = styled.div`
  white-space: nowrap;
  padding: 0;
  border-radius: 8px;
  margin: 20px auto 10px;
  width: 100%;
  height: 446px;
  overflow-y: hidden;
  overflow-x: auto;
  scroll-direction: horizontal;

  &::-webkit-scrollbar {
    height: 16px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #a9a9a9;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    padding: 3px 0;
  }
`

export const Card = styled.a`
  width: 300px;
  height: 130px;
  background-color: #282828;
  border-radius: 8px;
  position: relative;
  margin: 10px 0;
  transition: all 0.3s ease;

  :hover {
    img {
      width: 75%;
    }
  }
`

export const CardImage = styled.img`
  height: 420px;
  width: 400px;
  margin: 0 10px 10px;
`
