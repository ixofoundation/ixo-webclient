require('dotenv').config()
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { HeaderConnected } from './components/header/HeaderContainer'
import Footer from './components/footer/FooterContainer'
import { RootState } from './common/redux/types'
import styled, { ThemeProvider } from 'styled-components'
import { initIxo } from './modules/ixo/ixo.actions'
import { initKeysafe } from './modules/keysafe/keysafe.actions'
import { UserInfo } from './types/models'
import { initUserInfo } from './modules/login/login.actions'
import ScrollToTop from './components/common/ScrollToTop'
import './assets/icons.css'

import 'react-toastify/dist/ReactToastify.min.css'
import { Routes } from './components/Routes'
import { Spinner } from './components/common/Spinner'
import { ToastContainer } from 'react-toastify'
import * as ReactGA from 'react-ga'
import { explorerSocket } from './components/helpers/explorerSocket'
import { connectWeb3 } from './modules/web3/web3.actions'
ReactGA.initialize('UA-106630107-5')

ReactGA.pageview(window.location.pathname + window.location.search)

// THEME DECLARATION BELOW

const theme = {
  ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
  ixoOrange: '#F89D28',
  bg: {
    blue: '#002233', // dashboard background
    green: '#5AB946',
    darkBlue: '#01151F', // Tooltips background
    lightBlue: '#017492', // active button background for tabs on hero section
    lightGrey: '#F6F6F6', // light background for projects list
    gradientBlue: 'linear-gradient(to bottom, #012639 0%,#002d42 100%)', // background for widgets (charts, graphs, tabs, etc.)
    gradientDarkBlue: 'linear-gradient(180deg, #038FB8 0%, #036C93 100%)', // claims
    gradientButton: 'linear-gradient(to bottom, #03D0FB 0%, #016480 100%)',
    gradientButtonGreen: 'linear-gradient(180deg, #5AB946 0%, #339F1C 100%)',
    gradientButtonRed: 'linear-gradient(180deg, #C5202D 0%, #AB101C 100%)',
    darkButton: '#0C3550',
    gradientWhite: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
  },
  fontBlueButtonNormal: 'white',
  fontBlueButtonHover: '#83D9F2',
  fontDarkBlueButtonNormal: 'white',
  fontDarkBlueButtonHover: '#00D2FF',
  fontBlue: '#49BFE0', // Same as ixoBlue
  fontDarkBlue: '#013C4F',
  fontDarkGrey: '#282828',
  fontLightBlue: '#83D9F2', // big hero section numbers, widgets big numbers
  fontGrey: '#282828', // generally text on white background
  fontRoboto: 'Roboto, sans-serif',
  fontRobotoCondensed: 'Roboto Condensed, sans-serif',
  grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
  darkGrey: '#656969', // "load more projects" button on project list
  lightGrey: '#B6B6B6',
  widgetBorder: '#0C3550', // border color for graphs/ charts, etc.
  graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
  red: '#E2223B',
}

// END OF THEME DECLARATION, CSS FOR COMPONENT BELOW
const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100%;
  font-family: roboto;

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  a {
  }
  font-weight: 300;
`

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export interface State {
  loginError: string
  error: any
  errorInfo: any
  onLoginInitCalled: boolean
}

export interface StateProps {
  ixo?: any
  pingError?: string
  pingResult?: string
  keysafe?: any
  userInfo: UserInfo
  location: any
  history: any
  match: any
}
export interface DispatchProps {
  onIxoInit: () => void
  onKeysafeInit: () => void
  onLoginInit: (keysafe: any, ixo: any) => void
  onWeb3Connect: () => void
}
export interface Props extends StateProps, DispatchProps {}

class App extends React.Component<Props, State> {
  state = {
    loginError: null,
    isProjectPage: false,
    errorInfo: null,
    error: null,
    onLoginInitCalled: false,
  }

  private keySafeInterval = null

  componentDidUpdate(): void {
    if (
      this.props.ixo !== null &&
      this.props.keysafe !== null &&
      this.state.onLoginInitCalled === false
    ) {
      this.keySafeInterval = setInterval(
        () => this.handleLoginInKeysafe(),
        3000,
      )
      this.setState({ onLoginInitCalled: true })
    }
  }

  componentDidMount(): void {
    this.props.onIxoInit()
    this.props.onKeysafeInit()
    this.props.onWeb3Connect()

    explorerSocket.on('did created', function() {
      // console.log('did created');
      // console.log(data);
    })

    explorerSocket.on('did updated', function() {
      // console.log('did updated');
      // console.log(data);
    })

    explorerSocket.on('did updated', function() {
      // console.log('did updated');
      // console.log(data);
    })
  }

  handleLoginInKeysafe = (): void => {
    let userInfo: UserInfo = {
      ledgered: false,
      hasKYC: false,
      loggedInKeysafe: false,
      didDoc: {
        did: '',
        pubKey: '',
      },
      name: '',
    }

    this.props.keysafe.getInfo((error, response) => {
      if (response) {
        userInfo = Object.assign({}, response)
        userInfo.loggedInKeysafe = true
        this.props.ixo.user
          .getDidDoc(userInfo.didDoc.did)
          .then((didResponse: any) => {
            if (didResponse.error) {
              userInfo.ledgered = false
              userInfo.hasKYC = false
            } else {
              userInfo.ledgered = true
              if (didResponse.credentials.length > 0) {
                userInfo.hasKYC = true
              } else {
                userInfo.hasKYC = false
              }
            }
            if (
              JSON.stringify(this.props.userInfo) !== JSON.stringify(userInfo)
            ) {
              this.props.onLoginInit(userInfo, '')
            }
          })
          .catch(didError => {
            console.log(didError)
          })
      } else {
        userInfo.loggedInKeysafe = false
        if (JSON.stringify(this.props.userInfo) !== JSON.stringify(userInfo)) {
          this.props.onLoginInit(userInfo, 'Please log into IXO Keysafe')
        }
      }
    })
  }

  componentWillUnmount(): void {
    clearInterval(this.keySafeInterval)
  }

  handlePingExplorer = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const t0 = performance.now()
      if (this.props.ixo) {
        this.props.ixo.network
          .pingIxoExplorer()
          .then(result => {
            if (result === 'API is running') {
              const t1 = performance.now()
              resolve(Math.trunc(t1 - t0))
            } else {
              reject(0)
            }
          })
          .catch(() => {
            reject(0)
          })
      } else {
        reject(0)
      }
    })
  }

  render(): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <Container>
            <HeaderConnected
              pingIxoExplorer={this.handlePingExplorer}
              simpleHeader={false}
              userInfo={this.props.userInfo}
              refreshProjects={(): void => console.log('clicked')}
              initUserInfo={(): void =>
                this.props.onLoginInit(this.props.keysafe, this.props.ixo)
              }
            />
            <ToastContainer hideProgressBar={true} />
            <ContentWrapper>
              {this.props.ixo !== null ? (
                <Routes />
              ) : (
                <Spinner info={'Loading ixo.world...'} />
              )}
            </ContentWrapper>
            <Footer />
          </Container>
        </ScrollToTop>
      </ThemeProvider>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    ixo: state.ixo.ixo,
    keysafe: state.keySafe.keysafe,
    userInfo: state.login.userInfo,
  }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {
    onIxoInit: (): void => {
      dispatch(initIxo(process.env.REACT_APP_BLOCK_SYNC_URL))
    },
    onKeysafeInit: (): void => {
      dispatch(initKeysafe())
    },
    onLoginInit: (userInfo: UserInfo, error: string): void => {
      dispatch(initUserInfo(userInfo, error))
    },
    onWeb3Connect: (): void => {
      dispatch(connectWeb3())
    },
  }
}

export const AppConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App as any) as any,
)
