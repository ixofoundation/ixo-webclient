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
import { useHistory, withRouter } from 'react-router-dom'
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
import { apiEntityToEntity } from 'utils/entities'
import { useEntitiesLazyQuery } from 'generated/graphql'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const customTheme = useAppSelector(selectCustomTheme)
  const entityConfig = useAppSelector(selectEntityConfig)
  const { cwClient, address } = useAccount()
  const [apiEntities, setApiEntities] = useState<any>([])
  const [fetchEntities, { refetch }] = useEntitiesLazyQuery()

  const [customizedTheme, setCustomizedTheme] = useState<any>(theme)

  useEffect(() => {
    dispatch(getEntityConfig())
    dispatch(getCustomTheme())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const relayerNode = process.env.REACT_APP_RELAYER_NODE ?? ''
    fetchEntities({
      variables: {
        relayerNode,
        ...(address && { owner: address }),
      },
    }).then((response) => setApiEntities(response.data?.entities?.nodes))
  }, [address, fetchEntities])

  useEffect(() => {
    if (history.location.pathname === '/explore') {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname])

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
      dispatch(getEntitiesFromGraphqlAction(apiEntities as any))
      ;(async () => {
        for (const entity of apiEntities) {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            dispatch(updateEntityPropertyAction(entity.id, key, data, merge))
          })
        }
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cwClient, apiEntities])

  return (
    <ThemeProvider theme={customizedTheme}>
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
    </ThemeProvider>
  )
}

export const AppConnected = withRouter(App)
