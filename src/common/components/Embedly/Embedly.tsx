import React from 'react'
import { importScript } from '../../utils/customHook.utils'

interface Props {
  url: string
}

const Embedly: React.FunctionComponent<Props> = ({ url }) => {
  importScript('https://cdn.embedly.com/widgets/platform.js')

  return (
    <a
      href={url}
      className="embedly-card"
      data-card-recommend="0"
      data-card-key={process.env.REACT_APP_EMBEDLY_KEY}
      data-card-controls="0"
    />
  )
}

export default Embedly
