import blocksyncApi from 'api/blocksync/blocksync'
import AssistantContext from 'contexts/assistant'
import { AnyObject } from 'immer/dist/internal'
import { changeEntitiesType, getEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { EntityType, EntityConfig } from 'modules/Entities/types'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import * as React from 'react'
import * as ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UpdateService } from 'services'
import { getAssetListConfig, getExchangeConfig, getRelayersConfig } from 'redux/configs/configs.actions'
import { ThemeProvider } from 'styled-components'
import 'assets/icons.css'
import Footer from '../Footer/FooterContainer'
import { HeaderConnected } from '../Header/HeaderContainer'
import ScrollToTop from '../ScrollToTop'
import { Spinner } from '../Spinner'
import { RootState } from '../../redux/types'
import { Routes } from '../../routes'
import { toggleAssistant } from '../../redux/account/account.actions'
import { UserInfo } from '../../redux/account/account.types'
import { Container, ContentWrapper, theme } from './App.styles'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

export interface State {
  loginError: string
  error: any
  errorInfo: any
  customizedTheme: AnyObject
}

export interface Props {
  pingError?: string
  pingResult?: string
  userInfo: UserInfo
  location: any
  history: any
  match: any
  entityTypeMap: EntityConfig
  onIxoInit: () => void
  onKeysafeInit: () => void
  onWeb3Connect: () => void
  loginStatusCheckCompleted: boolean
  assistantToggled: boolean
  toggleAssistant: () => void
  handleGetRelayersConfig: () => void
  handleGetEntityConfig: () => void
  handleGetAssetListConfig: () => void
  handleGetExchangeConfig: () => void
  handleChangeEntitiesType: (type: EntityType) => void
}

class App extends React.Component<Props, State> {
  state: any = {
    loginError: null,
    isProjectPage: false,
    errorInfo: null,
    error: null,
    customizedTheme: theme,
  }

  private keySafeInterval: any = null

  componentDidMount(): void {
    this.props.handleGetRelayersConfig()
    this.props.handleGetEntityConfig()
    this.props.handleGetAssetListConfig()
    this.props.handleGetExchangeConfig()
  }
  UNSAFE_componentWillReceiveProps(props: any): void {
    if (props.entityTypeMap !== this.props.entityTypeMap) {
      let newEntityType = EntityType.Project
      const { UI } = props.entityTypeMap
      if (UI) {
        const { explorer } = UI
        if (explorer) {
          const { defaultView } = explorer
          if (defaultView) {
            newEntityType = defaultView
          }
        }
      }
      this.props.handleChangeEntitiesType(newEntityType)

      // apply custom theme
      const { theme: myTheme } = props.entityTypeMap
      if (myTheme) {
        let customizedTheme = this.state.customizedTheme
        const { fontFamily, primaryColor, highlight } = myTheme
        if (fontFamily) {
          customizedTheme = {
            ...customizedTheme,
            primaryFontFamily: fontFamily,
          }
        }
        if (primaryColor) {
          customizedTheme = {
            ...customizedTheme,
            ixoBlue: primaryColor,
          }
        }
        if (highlight) {
          customizedTheme = {
            ...customizedTheme,
            highlight,
            pending: highlight.light,
          }
        }
        this.setState({ customizedTheme })
      }
    }
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
    const { assistantToggled, toggleAssistant } = this.props
    // let assistantBaseStyles: any = {
    //   background: '#F0F3F9',
    //   zIndex: 8,
    // }

    // if (assistantFixed || isMobile) {
    //   assistantBaseStyles = {
    //     ...assistantBaseStyles,
    //     position: 'fixed',
    //     right: 0,
    //   }
    // }

    return (
      <ThemeProvider theme={this.state.customizedTheme}>
        <AssistantContext.Provider value={{ active: assistantToggled }}>
          <ScrollToTop>
            <Container>
              <HeaderConnected />
              <ToastContainer hideProgressBar={true} position='top-right' />
              <div className='d-flex' style={{ flex: 1 }}>
                <ContentWrapper>
                  {(this.props.loginStatusCheckCompleted || !window['ixoKs']) && this.props.entityTypeMap ? (
                    <Routes />
                  ) : (
                    <Spinner info={'Loading ixo.world...'} />
                  )}
                </ContentWrapper>
                {assistantToggled && <FundingChat assistantPanelToggle={toggleAssistant} />}
                {/* <Transition
                  items={assistantToggled}
                  from={{ width: '0%' }}
                  enter={{ width: isMobile ? '100%' : '25%' }}
                  leave={{ width: '0%' }}
                >
                  {(assistantToggled): any =>
                    assistantToggled &&
                    ((props): JSX.Element => (
                      <animated.div
                        style={{
                          ...assistantBaseStyles,
                          ...props,
                        }}
                      >
                        {assistantToggled && (
                          <FundingChat assistantPanelToggle={toggleAssistant} />
                        )}
                      </animated.div>
                    ))
                  }
                </Transition> */}
              </div>
              <Footer />
            </Container>
            <UpdateService />
          </ScrollToTop>
        </AssistantContext.Provider>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  userInfo: state.account.userInfo,
  assistantToggled: state.account.assistantToggled,
  loginStatusCheckCompleted: state.account.loginStatusCheckCompleted,
  entityTypeMap: state.entities.entityConfig,
})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (): void => {
    dispatch(toggleAssistant())
  },
  handleGetRelayersConfig: (): void => dispatch(getRelayersConfig()),
  handleGetAssetListConfig: (): void => dispatch(getAssetListConfig()),
  handleGetExchangeConfig: (): void => dispatch(getExchangeConfig()),
  handleGetEntityConfig: (): void => dispatch(getEntityConfig()),
  handleChangeEntitiesType: (type: EntityType): void => dispatch(changeEntitiesType(type)),
})

export const AppConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(App as any) as any)
