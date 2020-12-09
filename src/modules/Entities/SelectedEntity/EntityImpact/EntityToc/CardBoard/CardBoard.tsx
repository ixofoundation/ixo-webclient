import React from 'react'
import Card from './Card'
import Arrow from './Arrow'

import {
  Column,
  ColumnHeader,
  ColumnContent
} from './CardBoard.styles'

const CardBoard: React.FunctionComponent = ({}) => {
  const headers = [
    'inputs',
    'activities',
    'outputs',
    'reach',
    'outcomes',
    'impacts',
  ]

  const content = [
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
    'Development of EDPQS and support materials by Prevention Standards Partnership',
  ]

  const handleRenderColumn = (title: string) => {
    return (
      <Column>
        <ColumnHeader>
          { title }
          <Arrow />
        </ColumnHeader>
        <ColumnContent>
          {
            [...content].splice(0, (Math.random() * 10) % 9).map((text, key) => <Card key={key}>{ text }</Card>)
          }
        </ColumnContent>
      </Column>
    )
  }

  return (
    <div className="d-flex">
      {
        headers.map(title => handleRenderColumn(title))
      }
    </div>
  )
}

export default CardBoard