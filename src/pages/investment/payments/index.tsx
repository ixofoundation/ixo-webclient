import React, { ReactElement } from 'react'

interface Props {
  transactions?: []
}

export default function Payments({ transactions }: Props): ReactElement {
  console.log(transactions)
  return (
    <div>
      
    </div>
  )
}
