import { deviceWidth } from 'constants/device'
import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  width: 100%;
  margin-bottom: 20px;

  img {
    height: 200px;
    width: 200px;
  }

  p {
    margin: 0px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    flex-direction: column;

    img {
      width: 100%;
      object-fit: unset;
      height: unset;
    }
  }
`

export const ContainerColumn = styled.section`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin-bottom: 20px;
  }
`
