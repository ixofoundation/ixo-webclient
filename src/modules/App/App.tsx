require('dotenv').config()
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { HeaderConnected } from '../../common/components/Header/HeaderContainer'
import Footer from '../../common/components/Footer/FooterContainer'
import { RootState } from '../../common/redux/types'
import { ThemeProvider } from 'styled-components'
import { theme, Container, ContentWrapper } from './App.styles'
import { initIxo } from '../ixo/ixo.actions'
import { initKeysafe } from '../keysafe/keysafe.actions'
import { UserInfo } from '../account/types'
import { updateLoginStatus } from '../account/account.actions'
import ScrollToTop from '../../components/common/ScrollToTop'
import '../../assets/icons.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { Routes } from '../../components/Routes'
import { Spinner } from '../../components/common/Spinner'
import { ToastContainer } from 'react-toastify'
import * as ReactGA from 'react-ga'
import { connectWeb3 } from '../web3/web3.actions'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

export interface State {
  loginError: string
  error: any
  errorInfo: any
  onLoginCalled: boolean
}

export interface Props {
  ixo?: any
  pingError?: string
  pingResult?: string
  keysafe?: any
  userInfo: UserInfo
  location: any
  history: any
  match: any
  onIxoInit: () => void
  onKeysafeInit: () => void
  onUpdateLoginStatus: () => void
  onWeb3Connect: () => void
  loginStatusCheckCompleted: boolean
}

class App extends React.Component<Props, State> {
  state = {
    loginError: null,
    isProjectPage: false,
    errorInfo: null,
    error: null,
    onLoginCalled: false,
  }

  private keySafeInterval = null

  componentDidUpdate(): void {
    if (
      this.props.ixo !== null &&
      this.props.keysafe !== null &&
      this.state.onLoginCalled === false
    ) {
      this.keySafeInterval = setInterval(
        () => this.props.onUpdateLoginStatus(),
        3000,
      )
      this.setState({ onLoginCalled: true })
    }
  }

  componentDidMount(): void {
    this.props.onIxoInit()
    this.props.onKeysafeInit()
    this.props.onWeb3Connect()
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
            />
            <ToastContainer hideProgressBar={true} />
            <ContentWrapper>
              {(this.props.ixo !== null &&
                this.props.loginStatusCheckCompleted) ||
              (this.props.ixo !== null && !window['ixoKs']) ? (
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

const mapStateToProps = (state: RootState): Record<string, any> => ({
  ixo: state.ixo.ixo,
  keysafe: state.keySafe.keysafe,
  userInfo: state.account.userInfo,
  loginStatusCheckCompleted: state.account.loginStatusCheckCompleted,
})

const mapDispatchToProps = (dispatch: any): any => ({
  onIxoInit: (): void => {
    dispatch(initIxo(process.env.REACT_APP_BLOCK_SYNC_URL))
  },
  onKeysafeInit: (): void => {
    dispatch(initKeysafe())
  },
  onUpdateLoginStatus: (): void => {
    dispatch(updateLoginStatus())
  },
  onWeb3Connect: (): void => {
    dispatch(connectWeb3())
  },
})

export const AppConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App as any) as any,
)
