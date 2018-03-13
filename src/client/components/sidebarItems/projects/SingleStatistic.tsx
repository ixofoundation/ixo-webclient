import * as React from 'react';
import styled from 'styled-components';

export interface Props {
    title: string,
    number: any
}

export default class SingleStatistic extends React.Component<Props> {

    constructor(props?:Props){
        super(props);

    }
    
    render() {
        return (
            <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                <p>{this.props.title}</p>
                <Number>{this.props.number}</Number>
            </div>
        );
    }
    
}

const Number = styled.p`
    font-size:40px;
    font-weight:bold;
    text-align:center;
`
