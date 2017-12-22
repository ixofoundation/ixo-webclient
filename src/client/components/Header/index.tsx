import * as React from 'react';

export namespace Header {
  export interface Props {
    addTodo: (todo: TodoItemData) => any;
  }

  export interface State {
  }
}

export class Header extends React.Component<Header.Props, Header.State> {

  constructor(props?: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text });
    }
  }

  render() {
    return (
      <header>
        <h1>ixo Protocol</h1>
      </header>
    );
  }
}
