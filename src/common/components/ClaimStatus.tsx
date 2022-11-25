import styled from 'styled-components'

const Container = styled.div`
  justify-content: center;
  display: flex;
  padding: 5px;
`

const Icon = styled.div`
  font-size: 64px;
  padding-bottom: 10px;
  i:before {
    color: ${/* eslint-disable-line */ (props) => props.theme.bg.lightBlue};
  }
`

const MessageText = styled.div`
  color: ${/* eslint-disable-line */ (props) => props.theme.bg.lightBlue};
  font-size: 18px;
  font-family: ${/* eslint-disable-line */ (props) => props.theme.primaryFontFamily};
  text-align: center;
`

export interface Props {
  message: string
  icon: string
}

export const ClaimStatus: React.SFC<Props> = (props) => {
  return (
    <Container className='row'>
      <div className='col-md-12'>
        <Icon className='row d-flex justify-content-center'>
          <i className={props.icon} />
        </Icon>
        <MessageText className='row d-flex justify-content-center'>{props.message}</MessageText>
      </div>
    </Container>
  )
}
