import * as React from 'react'

export interface ParentProps {
  title: string
}

export const Stateless: React.SFC<ParentProps> = () => {
  return <div className="container-fluid">test</div>
}
