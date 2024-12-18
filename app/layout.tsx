import '@mantine/core/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Metadata } from 'next'
import Providers from '../Providers/Providers'
import './global.css'
import '@mantine/dates/styles.css'
import '@blocknote/mantine/style.css'

export const metadata: Metadata = {
  title: 'IXO Portal',
  description: 'IXO Portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#000000' />
        <link rel='stylesheet' href='/assets/icons.css' />
        <link rel='stylesheet' href='/assets/global.css' />
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
