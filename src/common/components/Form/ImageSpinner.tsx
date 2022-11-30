import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 150px;
  background-color: none;
  border-radius: 3px;

  p {
    display: block;
    margin-top: 10px;
  }
`

const LoaderContainer = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoaderWrapper = styled.div`
  padding: 0;
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  background: #00c2e4;
  justify-content: center;
  align-items: center;
`

const Pulse = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  position: absolute;
  margin: 0;
  padding: 0;

  @keyframes iPulse {
    0% {
      width: 40px;
      height: 40px;
      background: rgba(0, 210, 255, 1);
    }
    100% {
      width: 80px;
      height: 80px;
      background: rgba(0, 34, 51, 0);
    }
  }
  animation: iPulse 1.5s infinite ease;
`

const IxoIcon = styled.i`
  font-size: 54px;
  display: block;
  width: 29px;
  height: 29px;
  padding: 0;
  background: #fff;
  border-radius: 50%;
  position: absolute;

  :before {
    color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    position: relative;
    top: -13px;
    left: -12px;
  }
`
export interface Props {
  info?: string
}

export const ImageSpinner: React.SFC<Props> = ({ info }) => {
  return (
    <Container className="col-md-12">
      <LoaderContainer>
        <Pulse />
        <LoaderWrapper>
          <IxoIcon className="icon-ixo-x" />
        </LoaderWrapper>
      </LoaderContainer>
      <p>{info ? info : 'Loading image...'}</p>
    </Container>
  )
}
