import * as React from 'react';
import * as style from './style.css';

export namespace HomePage {
  export interface Props {
  }

  export interface State {
  }
}

export class HomePage extends React.Component<HomePage.Props, HomePage.State> {

  constructor(props?: HomePage.Props, context?: any) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className={style.view}>
      </div>
    );
  }
}
