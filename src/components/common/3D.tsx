import * as React from 'react'
import styled from 'styled-components'

const CubeFront = styled.div`
  width: 320px;
  height: 200px;
  backface-visibility: hidden;
  transform: rotateX(0deg) translate3d(0, 0, 100px);
  box-shadow: 0px 0px 20px 0px ${props => props.theme.ixoBlue};
  background: ${props => props.theme.bg.lightBlue};

  transition: all 0.5s ease;
`

const CubeTop = styled.div`
  background: ${props => props.theme.bg.blue};
  width: 320px;
  height: 200px;
  transform: rotateX(-90deg) translate3d(0, 0, -100px);
  backface-visibility: hidden;
  box-shadow: 0px 0px 20px 0px ${props => props.theme.ixoBlue};

  transition: all 0.5s ease;
`

const LoadingCube = styled.div`
  width: 320px;
  height: 200px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: black;

  // animation: spincube 4s ease-in-out infinite;
  transform-style: preserve-3d;
  transform-origin: center center;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  backface-visibility: hidden;
  transition: transform 0.5s ease;
  :hover {
    transform: rotateX(90deg) rotateY(0deg) rotateZ(0deg);

    ${CubeFront} {
      background: ${props => props.theme.bg.blue};
    }

    ${CubeTop} {
      background: ${props => props.theme.bg.lightBlue};
    }
  }
`
export interface ParentProps {
  title: string
}

export const ThreeD: React.SFC<ParentProps> = props => {
  return (
    <LoadingCube>
      <CubeFront>
        <p>Test text</p>
      </CubeFront>
      <CubeTop>
        <p>Test text</p>
      </CubeTop>
    </LoadingCube>
  )
}
