import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-dates/lib/css/_datepicker.css'
import 'assets/toasts.scss'
import AssistantContext from 'contexts/assistant'
import React from 'react'
import * as ReactGA from 'react-ga'
import { ToastContainer } from 'react-toastify'
import { ServicesInitialisation } from 'components'
import Footer from '../Footer'
import { HeaderConnected } from '../Header/HeaderContainer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { Container, ContentWrapper } from './App.styles'
import { Outlet } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { WalletModal, WalletProvider } from 'wallet-connector'
import RedirectToMyAccount from 'components/Header/components/RedirectToMyAccount'
import { chainNetwork } from 'hooks/configs'
import { RPC_ENDPOINT } from 'lib/protocol'
import RootInit from 'utils/init/rootInit'
import { Companion } from 'components/Companion'
import { CompanionProvider } from 'contexts/CompanionContext'
import { KeyValueViewerProvider } from 'contexts/KeyValueViewerContext'
import { RequestsProvider } from 'contexts/RequestsContext'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  return (
    <AssistantContext.Provider value={{ active: false }}>
      <WalletProvider
        chainNetwork={chainNetwork}
        customComponent={<RedirectToMyAccount />}
        rpcEndpoint={RPC_ENDPOINT ?? ''}
      >
        <WalletModal />
        <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />
        <RootInit />
        <ServicesInitialisation />
        <ScrollToTop>
          <CompanionProvider>
            <RequestsProvider>
              <KeyValueViewerProvider>
                <Container>
                  <HeaderConnected />
                  <Companion />
                  <Flex mt={74} w='100%' h={'calc(100vh - 74px)'} style={{ flex: 1 }}>
                    <ContentWrapper>
                      <Outlet />
                    </ContentWrapper>
                  </Flex>
                  <Footer />
                </Container>
              </KeyValueViewerProvider>
            </RequestsProvider>
          </CompanionProvider>
        </ScrollToTop>
      </WalletProvider>
    </AssistantContext.Provider>
  )
}

export const AppConnected = App
