import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-dates/lib/css/_datepicker.css'
import 'assets/icons.css'
import 'assets/toasts.scss'

import AssistantContext from 'contexts/assistant'
import {
  changeEntitiesType,
  getEntitiesFromGraphqlAction,
  getEntityConfig,
  updateEntityPropertyAction,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import React, { useEffect, useState } from 'react'
import * as ReactGA from 'react-ga'
import { withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Services from 'services'
import { ThemeProvider } from 'styled-components'
import Footer from '../Footer/FooterContainer'
import { HeaderConnected } from '../Header/HeaderContainer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { Spinner } from '../Spinner/Spinner'
import { Routes } from 'routes'
import { Container, ContentWrapper, theme } from './App.styles'
import { WalletManagerProvider, WalletType } from '@gssuper/cosmodal'
import { getCustomTheme } from 'redux/theme/theme.actions'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { selectCustomTheme } from 'redux/theme/theme.selectors'
import { useAccount } from 'hooks/account'
import { useGetAllEntities } from 'hooks/entities'
import { apiEntityToEntity } from 'utils/entities'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID!
const LOCAL_STORAGE_KEY = 'ixo-webclient/connectedWalletId'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const customTheme = useAppSelector(selectCustomTheme)
  const entityConfig = useAppSelector(selectEntityConfig)
  const { cwClient } = useAccount()
  const { data: apiEntities } = useGetAllEntities()

  const [customizedTheme, setCustomizedTheme] = useState<any>(theme)

  useEffect(() => {
    dispatch(getEntityConfig())
    dispatch(getCustomTheme())
  }, [dispatch])

  useEffect(() => {
    if (entityConfig) {
      let newEntityType = 'project'
      const { UI } = entityConfig
      if (UI) {
        const { explorer } = UI
        if (explorer) {
          const { defaultView } = explorer
          if (defaultView) {
            newEntityType = defaultView
          }
        }
      }

      // apply custom theme
      const { theme: myTheme } = entityConfig
      if (myTheme) {
        let newCustomizedTheme = customizedTheme
        const { fontFamily, primaryColor, highlight } = myTheme
        if (fontFamily) {
          newCustomizedTheme = {
            ...newCustomizedTheme,
            primaryFontFamily: fontFamily,
          }
        }
        if (primaryColor) {
          newCustomizedTheme = {
            ...newCustomizedTheme,
            ixoBlue: primaryColor,
            ixoNewBlue: primaryColor,
          }
        }
        if (highlight) {
          newCustomizedTheme = {
            ...newCustomizedTheme,
            highlight,
            pending: highlight.light,
          }
        }
        newCustomizedTheme = {
          ...newCustomizedTheme,
          ...customTheme,
        }
        setCustomizedTheme(newCustomizedTheme)
      } else {
        setCustomizedTheme((v: any) => ({ ...v, ...customTheme }))
      }
      dispatch(changeEntitiesType(newEntityType))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityConfig])

  useEffect(() => {
    if (cwClient && apiEntities.length > 0) {
      dispatch(getEntitiesFromGraphqlAction(apiEntities))

      apiEntities.forEach((entity: any) => {
        const { id } = entity
        apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
          dispatch(updateEntityPropertyAction(id, key, data, merge))
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cwClient, apiEntities])

  return (
    <ThemeProvider theme={customizedTheme}>
      <WalletManagerProvider
        defaultChainId={CHAIN_ID}
        enabledWalletTypes={[
          WalletType.Keplr,
          // WalletType.WalletConnect
        ]}
        localStorageKey={LOCAL_STORAGE_KEY}
        walletConnectClientMeta={{
          // TODO:
          name: 'CosmodalExampleDAPP',
          description: 'A dapp using the cosmodal library.',
          url: 'https://cosmodal.example.app',
          icons: ['https://cosmodal.example.app/walletconnect.png'],
        }}
        defaultUiConfig={{
          classNames: {
            modalContent: 'cosmodal-content',
            modalOverlay: 'cosmodal-overlay',
            modalHeader: 'cosmodal-header',
            modalSubheader: 'cosmodal-subheader',
            modalCloseButton: 'cosmodal-close-button',
            walletList: 'cosmodal-wallet-list',
            wallet: 'cosmodal-wallet',
            walletImage: 'cosmodal-wallet-image',
            walletInfo: 'cosmodal-wallet-info',
            walletName: 'cosmodal-wallet-name',
            walletDescription: 'cosmodal-wallet-description',
            textContent: 'cosmodal-text-content',
          },
        }}
      >
        <AssistantContext.Provider value={{ active: false }}>
          <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />
          <Services />
          <ScrollToTop>
            <Container>
              <HeaderConnected />
              <div className='d-flex' style={{ flex: 1 }}>
                <ContentWrapper>
                  {entityConfig && cwClient ? <Routes /> : <Spinner info={'Loading ixo.world...'} />}
                </ContentWrapper>
              </div>
              <Footer />
            </Container>
          </ScrollToTop>
        </AssistantContext.Provider>
      </WalletManagerProvider>
    </ThemeProvider>
  )
}

export const AppConnected = withRouter(App)
