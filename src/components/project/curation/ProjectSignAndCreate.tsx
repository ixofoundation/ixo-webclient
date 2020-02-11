import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { PublicSiteStoreState } from '../../../redux/public_site_reducer'
import { connect } from 'react-redux'
import { decode as base64Decode } from 'base-64'
import styled from 'styled-components'
import { successToast, errorToast } from '../../helpers/Toast'
import { ErrorTypes } from '../../../types/models'
import * as queryString from 'query-string'
import { Banner } from './Banner'
import { ImageSpinner } from '../../common/ImageSpinner'

const CreateContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Container = styled.div`
  button {
    margin: 0 10px 10px 10px;
  }
  height: 300px;
  justify-content: center;
  display: flex;
  background-color: #fafafa;
  align-items: center;
`

const BottomContainer = styled.div`
  display: flex;
  flex: 1;
  padding-top: 30px;
  padding-bottom: 30px;

  background: url(${require('../../../assets/images/register/background.jpg')})
    no-repeat center top;
  background-size: cover;

  p {
    color: white;
  }
`

const ModalContainer = styled.div`
	font-family: ${
    /* eslint-disable-line */ props => props.theme.fontRobotoCondensed
  };
	color: ${/* eslint-disable-line */ props => props.theme.fontGrey};
	width: 550px;
	height: 400px
	position: relative;
	top: -10px;
	margin:0 auto;
	max-width: 100%;
	padding: 40px;
	border-radius: 2px;
	background-color: #FFFFFF;
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	text-align: center;


	p {
		font-weight: 300;
	}

	a {
		margin:30px 0;
	}
`

const ApprovedIcon = styled.div`
  padding-bottom: 10px;

  i {
    font-size: 64px;
    display: block;
    padding: 0;
  }
  .icon-success:before {
    color: ${/* eslint-disable-line */ props => props.theme.bg.green};
  }
`

const Title = styled.h2`
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  color: ${/* eslint-disable-line */ props => props.theme.fontGrey};
  font-size: 24px;
  letter-spacing: 0.16px;
  line-height: 32px;
`

const Content = styled.p`
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
  color: ${/* eslint-disable-line */ props => props.theme.fontGrey};
  font-size: 18px;
  font-weight: 300;
  line-height: 24px;
`

const ButtonLink = styled(NavLink)`
	color: ${/* eslint-disable-line */ props => props.theme.fontGrey};
	font-family: ${
    /* eslint-disable-line */ props => props.theme.fontRobotoCondensed
  };
	font-size: 16px;
	font-weight: 400;
	letter-spacing: 0.92px;
	text-transform: uppercase;
	border-radius:2px;
	border:1px solid #49bfe0;

	&:.active {
		color: ${/* eslint-disable-line */ props => props.theme.fontGrey};
	}

	@media (min-width: 415px) {
		padding: 5px 40px 5px;
		margin:0 10px;
		font-size:16px;
	}

	transition:border 0.3s ease;

	:hover {
 		text-decoration:none;
 		&&{color: ${/* eslint-disable-line */ props => props.theme.fontBlue};}}
 	}
`

export interface StateProps {
  ixo: any
  keysafe?: any
}

export interface State {
  status: string
}

export interface ParentProps {
  location: any
  match: any
}

export interface Props extends ParentProps, StateProps {}

export class ProjectSignAndCreate extends React.Component<Props, State> {
  state = {
    status: '',
  }

  fetchProjectFile = (key: string, pdsURL: string): void => {
    this.props.ixo.project
      .fetchPublic(key, pdsURL)
      .then((res: any) => {
        console.log('Fetched: ', res)
        const fileContents = base64Decode(res.data)
        return fileContents
      })
      .then(projectJson => {
        this.props.keysafe.requestSigning(
          projectJson,
          (error: any, signature: any) => {
            this.props.ixo.project
              .createProject(JSON.parse(projectJson), signature, pdsURL)
              .then((res: any) => {
                if (res.error) {
                  errorToast(res.error.message, ErrorTypes.message)
                } else {
                  this.setState({ status: 'Project created successfully' })
                  successToast('Project created successfully')
                }
              })
          },
          'base64',
        )
      })
  }

  componentDidMount(): void {
    if (this.props.keysafe === null) {
      errorToast('Please install IXO Credential Manager first.')
      this.setState({ status: 'Please install IXO Credential Manager first.' })
    } else {
      this.handleGetProjectData()
    }
  }

  handleGetProjectData = (): void => {
    const params = queryString.parse(this.props.location.search)
    const key = decodeURIComponent(params.key as string)
    const pdsURL = decodeURIComponent(params.url as string)
    this.fetchProjectFile(key, pdsURL)
  }

  renderModal = (): JSX.Element => {
    if (this.state.status === '') {
      return (
        <ModalContainer>
          <ImageSpinner info="Creating your project..." />
        </ModalContainer>
      )
    } else {
      return (
        <ModalContainer>
          <ApprovedIcon>
            <i className="icon-success" />
          </ApprovedIcon>
          <Title>
            Congratulations - your project has been successfully created in
            ixo.world!
          </Title>
          <Content>
            You can now recruit your service providers and evaluating agents by
            sharing your project page.
          </Content>
          <ButtonLink exact={true} to="/">
            View your Project
          </ButtonLink>
        </ModalContainer>
      )
    }
  }

  render(): JSX.Element {
    return (
      <CreateContainer>
        <Banner />
        <Container>{this.renderModal()}</Container>
        <BottomContainer />
      </CreateContainer>
    )
  }
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
  return {
    ixo: state.ixoStore.ixo,
    keysafe: state.keysafeStore.keysafe,
  }
}

export const ProjectSignAndCreateConnected = connect(mapStateToProps)(
  ProjectSignAndCreate,
)
