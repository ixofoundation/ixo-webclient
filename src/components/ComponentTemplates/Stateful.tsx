import * as React from 'react'

export interface ParentProps {
  title: string
}

export class Stateful extends React.Component<ParentProps, {}> {
  state = {}

  render(): JSX.Element {
    return <div className="container-fluid">CONTENT HERE</div>
  }
}
