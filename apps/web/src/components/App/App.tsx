import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-dates/lib/css/_datepicker.css'
import 'assets/icons.css'
import 'assets/toasts.scss'

import AssistantContext from 'contexts/assistant'
import { changeEntitiesType, getEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import React, { useEffect, useState } from 'react'
import * as ReactGA from 'react-ga'
import { ToastContainer } from 'react-toastify'
import Services from 'services'
import { ThemeProvider } from 'styled-components'
import Footer from '../Footer/FooterContainer'
import { HeaderConnected } from '../Header/HeaderContainer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { Spinner } from '../Spinner/Spinner'
import { Routes } from 'routes'
import { Container, ContentWrapper, theme } from './App.styles'
import { getCustomTheme } from 'redux/theme/theme.actions'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { selectCustomTheme } from 'redux/theme/theme.selectors'
import { useAccount } from 'hooks/account'
import { WalletModal } from '@ixo-webclient/wallet-connector'
import { Outlet } from 'react-router-dom'
import { selectEntityType } from 'redux/currentEntity/currentEntity.selectors'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  // const entityConfig = useAppSelector(selectEntityConfig)
  const customTheme = useAppSelector(selectCustomTheme)
  const entitiesType = useAppSelector(selectEntityType)
  const { cwClient } = useAccount()

  useEffect(() => {
    // dispatch(getEntityConfig())
    dispatch(getCustomTheme())

    console.log('App')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!customTheme && !entitiesType) return null

  return (
    <AssistantContext.Provider value={{ active: false }}>
      <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />
      <Services />
      <ScrollToTop>
        <Container>
          <HeaderConnected />
          <div className='d-flex' style={{ flex: 1 }}>
            <ContentWrapper>{cwClient && <Outlet />}</ContentWrapper>
          </div>
          <Footer />
        </Container>
      </ScrollToTop>
    </AssistantContext.Provider>
  )
}

export const AppConnected = App
