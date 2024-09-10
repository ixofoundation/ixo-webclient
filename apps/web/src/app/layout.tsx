'use client'
import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store, persistor } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'components/App/App.styles'
import { RouterProvider } from 'react-router-dom'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#000000' />
        <link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
          integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto+Condensed:100,300,400,700|Roboto:100,300,400,700'
          rel='stylesheet'
        />
        <link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' />
        <link href='https://rsms.me/inter/inter.css' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
        <link href='https://fonts.google.com/specimen/Inter?query=inter' rel='stylesheet' />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css' rel='stylesheet' />
        <ColorSchemeScript />
      </head>

      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <MantineProvider>
                {/* Add header */}
                {/* <RouterProvider router={router} /> */}
                {children}
              </MantineProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
