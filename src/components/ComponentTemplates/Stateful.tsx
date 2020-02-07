import * as React from 'react'

export interface ParentProps {
  title: string
}

export interface State {}

export class Stateful extends React.Component<ParentProps, State> {
  state = {}

  render() {
    return <div className="container-fluid">CONTENT HERE</div>
  }
}
