import React from 'react'
import SDGArray from 'data/sdgIcons.json'
import { SDGs } from './SDGIcons.styles'

interface Props {
  sdgs: string[]
}

const SDGIcons: React.FunctionComponent<Props> = ({ sdgs }) => {
  return Array.isArray(sdgs) ? (
    <SDGs>
      {sdgs?.map((sdg, index) => {
        const sdgInt = Math.floor(parseInt(sdg, 10))
        if (sdgInt > 0 && sdgInt <= SDGArray.length) {
          return <i key={index} className={`icon-sdg-${SDGArray[sdgInt - 1].ico}`} />
        }
        return null
      })}
    </SDGs>
  ) : null
}

export default SDGIcons
