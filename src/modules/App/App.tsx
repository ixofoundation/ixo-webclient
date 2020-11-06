import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import * as ReactGA from 'react-ga'
import { ThemeProvider } from 'styled-components'

import { HeaderConnected } from '../../common/components/Header/HeaderContainer'
import Footer from '../../common/components/Footer/FooterContainer'
import { RootState } from '../../common/redux/types'
import { theme, Container, ContentWrapper } from './App.styles'
import { UserInfo } from '../Account/types'
import { updateLoginStatus } from '../Account/Account.actions'
import ScrollToTop from '../../common/components/ScrollToTop'
import { Routes } from '../../routes'
import { Spinner } from '../../common/components/Spinner'
import '../../assets/icons.css'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

export interface State {
  loginError: string
  error: any
  errorInfo: any
}

export interface Props {
  pingError?: string
  pingResult?: string
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
  }

  private keySafeInterval = null

  componentDidMount(): void {
    this.props.onUpdateLoginStatus()

    this.keySafeInterval = setInterval(
      () => this.props.onUpdateLoginStatus(),
      3000,
    )
  }

  componentWillUnmount(): void {
    clearInterval(this.keySafeInterval)
  }

  handlePingExplorer = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const t0 = performance.now()
      blocksyncApi.network
        .pingIxoExplorer()
        .then((result) => {
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
            <ToastContainer hideProgressBar={true} position="top-right" />
            <ContentWrapper>
              {this.props.loginStatusCheckCompleted || !window['ixoKs'] ? (
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
  userInfo: state.account.userInfo,
  loginStatusCheckCompleted: state.account.loginStatusCheckCompleted,
})

const mapDispatchToProps = (dispatch: any): any => ({
  onUpdateLoginStatus: (): void => {
    dispatch(updateLoginStatus())
  },
})

export const AppConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App as any) as any,
)
