import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-dates/lib/css/_datepicker.css'
import 'assets/icons.css'
import 'assets/toasts.scss'

import AssistantContext from 'contexts/assistant'
import React from 'react'
import * as ReactGA from 'react-ga'
import { ToastContainer } from 'react-toastify'
import Services from 'services'
import Footer from '../Footer/FooterContainer'
import { HeaderConnected } from '../Header/HeaderContainer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { Container, ContentWrapper } from './App.styles'
import { useAccount } from 'hooks/account'
import { Outlet } from 'react-router-dom'
import { Flex } from '@mantine/core'


ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  const { cwClient } = useAccount()

  return (
    <AssistantContext.Provider value={{ active: false }}>
      <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />
      <Services />
      <ScrollToTop>
        <Container>
          <HeaderConnected />
          <Flex mt={74} w='100%' h={'calc(100vh - 222px)'} style={{ flex: 1 }}>
            <ContentWrapper>{cwClient && <Outlet />}</ContentWrapper>
          </Flex>
          <Footer />
        </Container>
      </ScrollToTop>
    </AssistantContext.Provider>
  )
}

export const AppConnected = App
