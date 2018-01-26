import * as React from 'react';
import styled from 'styled-components';

export namespace TextArea {
  export interface Props {
    text?: string;
    id: string;
  }

    export interface Callbacks {
        onChange: (event) => void
    }
    
    export interface IProps extends Props, Callbacks {

    }

}

export default class TextArea extends React.Component<TextArea.IProps> {
    constructor(props?: TextArea.IProps, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <Text>
                <textarea id={this.props.id} className="form-control"
                    placeholder={this.props.text}
                    onChange={this.props.onChange}>
                </textarea>
            </Text>
        );
    }
}

const Text = styled.div`
    
    & textarea {
        border-radius:0;
    }
`;