import React from 'react'
import { withRouter } from 'react-router-dom'

export interface Props {
  history: any
  location: any
  match: any
  staticContext: any
}
export class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(prevProps: any): void {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render(): React.ReactNode {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
