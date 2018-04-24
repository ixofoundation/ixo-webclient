import * as React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderConnected } from './components/Header';
import { PublicSiteStoreState } from './redux/public_site_reducer';

export namespace App {

  export interface State {
    projectList: any;
    myProjectList: any;
    serviceAgentProjectList: any;
    did: string;
}

  export interface StateProps {
      ixo?: any;
      pingError?: String;
      pingResult?: String;
  }

  export interface Props extends StateProps {
  }
}

class App extends React.Component<App.Props, App.State> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.state = {
        projectList: [],
        myProjectList: [],
        serviceAgentProjectList: [],
        did: ''
    };
  }

  metamaskAccountChecker = () => {
    if (this.state.did !== this.props.ixo.credentialProvider.getDid()) {
        this.setState({ did: this.props.ixo.credentialProvider.getDid() });
        this.refreshProjectList();
    }
  }

  refreshProjects = () => {
    this.props.ixo.project.listProjects().then((response: any) => {
        this.setState({ projectList: response.result });
    }).catch((error) => {
        console.error(error);
    });
  }

refreshMyProjects = () => {
    this.props.ixo.project.listProjectsByDid(this.props.ixo.credentialProvider.getDid()).then((response: any) => {
        this.setState({ myProjectList: response.result });
    }).catch((error) => {
        console.error(error);
    });
  }

refreshServiceAgentProjectList = () => {
    this.props.ixo.project.listProjectsByDidAndRole(this.props.ixo.credentialProvider.getDid(), 'SA').then((response: any) => {
        this.setState({ serviceAgentProjectList: response.result });
    }).catch((error) => {
        console.error(error);
    });
  }

  refreshProjectList = () => {
    this.refreshProjects();
    this.refreshMyProjects();
    this.refreshServiceAgentProjectList();
}

  componentDidMount() {
      setInterval(this.metamaskAccountChecker, 1000);
  }

  render() {
    return (
        <HeaderConnected />
    );
  }
}

function mapStateToProps(state: PublicSiteStoreState) {
  return {
      ixo: state.ixoStore.ixo,
      pingError: state.pingStore.pingError,
      pingResult: state.pingStore.pingResult
  };
}

export default connect<App.Props, App.State>(
  mapStateToProps
)(App);