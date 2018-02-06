import * as React              from 'react';
import * as Modal              from 'react-modal';
import {connect}               from 'react-redux';
import DynamicForm             from './formTemplates/DynamicForm';
import {ModalWrapper}          from './ModalWrapper';
import styled                  from 'styled-components';
import {IPublicSiteStoreState} from '../redux/public_site_reducer';
import {NavLink}               from 'react-router-dom';
import {withRouter}            from 'react-router';
import {App}                   from '../containers/App';

export namespace Sidebar {
    export interface Props {
        ixo?: any
    }

    export interface State {
        isModalOpen: boolean,
        projectSchema: any
    }

    export interface IProps extends Props {

    }
}

@withRouter
@connect(mapStateToProps)
export class Sidebar extends React.Component<Sidebar.IProps, Sidebar.State> {
    constructor(props?: Sidebar.Props, context?: any) {
        super(props, context);
        this.state = {
            isModalOpen  : false,
            projectSchema: []
        };

    }

    handleToggleModal(modalStatus){
        this.setState({isModalOpen: modalStatus});
    };

    componentDidUpdate(prevProps: App.Props) {
        if (prevProps.ixo !== this.props.ixo) {
            this.props.ixo.project.getProjectTemplate('default').then((response: any) => {
                const projectSchema = response.result.form.fields;

                if (projectSchema !== this.state.projectSchema) {
                    this.setState({projectSchema: projectSchema});
                }
            }).catch((result: Error) => {
                console.log(result);
            });
        }
    }

    render() {

        const theForm = this.state.projectSchema.length > 0 ?
            <DynamicForm formSchema={this.state.projectSchema} /> :
            <p>No Project Schema found</p>;

        return (
            <SidebarContainer className='col-md-2'>
                <SidebarLink exact to='/'>Dashboard</SidebarLink>
                    <ModalWrapper 
                        isModalOpen={this.state.isModalOpen}
                        handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>
                        {theForm}
                    </ModalWrapper>
                <SidebarModalLink href="#" onClick={() => this.handleToggleModal(true)}>Create a Project</SidebarModalLink>
                <SidebarLink exact to='/my-projects'>View My Projects</SidebarLink>
                <SidebarLink to='/service-agents'>Service Agents</SidebarLink>
            </SidebarContainer>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo
    };
}

/* STYLES BELOW */

const SidebarContainer = styled.div`
    background:${props => props.theme.bgMain};
    height:calc(100vh - 140px);

    && {
        padding:0;
    }
`;

const SidebarLink = styled(NavLink)`
    display:block;
    color:white;
    padding:10px;
    
    transition:all 0.3s ease;

    &:hover {
        background:${props => props.theme.bgLighter};
        color:white;
        text-decoration:none;
        padding-left:15px;
        cursor:pointer;
    }

    &.active {
        border-left:5px solid #0f8dab;
        background:${props => props.theme.bgLightest};
        padding-left:10px;
        color:#0f8dab;
    }
`;

const Link = SidebarLink.withComponent('a');
const SidebarModalLink = SidebarLink.withComponent('div');
