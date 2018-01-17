import * as React from 'react';

export namespace TextArea {
  export interface Props {
    text?: string;
    id: string;
  }

}

export default class TextArea extends React.Component<TextArea.Props> {
    constructor(props?: TextArea.Props, context?: any) {
        super(props, context);
    }

    handleChange=(e)=>{
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <section>
                <textarea id={this.props.id} className="form-control"
                    placeholder={this.props.text}
                    onChange={this.handleChange}>
                </textarea>
            </section>
        );
    }
}