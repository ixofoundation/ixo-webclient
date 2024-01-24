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
// import { getCustomTheme } from 'redux/theme/theme.actions'
// import { useAppDispatch, useAppSelector } from 'redux/hooks'
// import { selectCustomTheme } from 'redux/theme/theme.selectors'
import { useAccount } from 'hooks/account'
import { Outlet } from 'react-router-dom'
// import { selectEntityType } from 'redux/currentEntity/currentEntity.selectors'
// import { selectEntityConfig } from 'redux/configs/configs.selectors'
// import { getAsyncEntityConfig, getEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { Flex } from '@mantine/core'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  // const entityConfig = useAppSelector(selectEntityConfig)
  // const customTheme = useAppSelector(selectCustomTheme)
  const { cwClient } = useAccount()
  // const dispatch = useAppDispatch()
  

  // useEffect(() => {
  //   if (!entityConfig) {
  //     dispatch(getAsyncEntityConfig())
  //   }
  //   if (!customTheme) {
  //     dispatch(getCustomTheme())
  //   }
  // }, [entityConfig, customTheme, dispatch])

  // if (!customTheme && !entityConfig) return null

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
