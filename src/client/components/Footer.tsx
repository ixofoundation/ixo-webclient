import * as React from 'react';
import styled from 'styled-components';

export namespace Footer {
    export interface Props {
    }

    export interface State {
        /* empty */
    }
}

export class Footer extends React.Component<Footer.Props, Footer.State> {
    render() {
        return (
            <FooterContainer className="container-fluid">
                <div className="row">
                    <p className="col-md-12">Copyright ixo Foundation</p>
                </div>
            </FooterContainer>
        );
    }
}

const FooterContainer = styled.div`
    width:100%;
    height:70px;
    color:white;
    display: flex;
    align-items: center;
    background:black;
`;