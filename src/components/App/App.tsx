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
import { Container, theme } from './App.styles'
import { getCustomTheme } from 'redux/theme/theme.actions'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectEntityConfig, selectedFilteredEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { selectCustomTheme } from 'redux/theme/theme.selectors'
import { useAccount } from 'hooks/account'
import { Flex, MantineProvider } from '@mantine/core'
import mantineTheme from 'styles/mantine'
import { useEntitiesQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'

ReactGA.initialize('UA-106630107-5')
ReactGA.pageview(window.location.pathname + window.location.search)

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const customTheme = useAppSelector(selectCustomTheme)
  const entityConfig = useAppSelector(selectEntityConfig)
  const entities = useAppSelector(selectedFilteredEntities)
  const { cwClient } = useAccount()

  const [customizedTheme, setCustomizedTheme] = useState<any>(theme)

  useEntitiesQuery({
    skip: entities.length > 0,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        not: { type: { startsWith: 'asset' } },
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes ?? []
      if (nodes.length > 0) {
        dispatch(getEntitiesFromGraphqlAction(nodes as any[]))
        for (const entity of nodes) {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            dispatch(updateEntityPropertyAction(entity.id, key, data, merge))
          })
        }
      }
    },
  })

  useEffect(() => {
    dispatch(getEntityConfig())
    dispatch(getCustomTheme())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeProvider theme={customizedTheme}>
        <AssistantContext.Provider value={{ active: false }}>
          <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />
          <Services />
          <ScrollToTop>
            <Container>
              <HeaderConnected />
              <Flex mt={74} w='100%' h={'calc(100vh - 222px)'} style={{ flex: 1 }}>
                {entityConfig && cwClient && entities.length > 0 ? (
                  <Routes />
                ) : (
                  <Spinner info={'Connecting to the Internet of Impacts...'} />
                )}
              </Flex>
              <Footer />
            </Container>
          </ScrollToTop>
        </AssistantContext.Provider>
      </ThemeProvider>
    </MantineProvider>
  )
}

export const AppConnected = withRouter(App)
