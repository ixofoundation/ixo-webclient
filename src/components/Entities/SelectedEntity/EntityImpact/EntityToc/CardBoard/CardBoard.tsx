import React from 'react'
import Card from './Card'
import Arrow from './Arrow'

import { Column, ColumnHeader, ColumnContent } from './CardBoard.styles'

interface Props {
  data: any[]
}

const CardBoard: React.FunctionComponent<Props> = ({ data }) => {
  const handleRenderColumn = (attribute: any, key: number): JSX.Element => {
    return (
      <Column key={key}>
        <ColumnHeader>
          {Object.keys(attribute)[0]}
          {key !== data.length - 1 && <Arrow />}
        </ColumnHeader>
        <ColumnContent>
          {attribute[Object.keys(attribute)[0]].map((item: any, key: any) => (
            <Card key={key}>{item.value}</Card>
          ))}
        </ColumnContent>
      </Column>
    )
  }

  return <div className='d-flex'>{data.map((attribute, key) => handleRenderColumn(attribute, key))}</div>
}

export default CardBoard
