import * as React from 'react';

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
            <footer className="container-fluid bg-dark">
                <div className="row">
                    <p className="col-md-12">Copyright ixo Foundation</p>
                </div>
            </footer>
        );
    }
}
