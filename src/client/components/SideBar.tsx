import * as React  from 'react';
import * as Modal  from 'react-modal';
import DynamicForm from './formTemplates/DynamicForm';
import styled             from 'styled-components';
import { IPublicSiteStoreState } from '../redux/public_site_reducer';
import {NavLink} from 'react-router-dom';

export namespace Sidebar {
    export interface Props {
        projectSchema: any
    }

    export interface State {
        isModalOpen: boolean
    }
}

export class Sidebar extends React.Component<Sidebar.Props, Sidebar.State> {
    constructor(props?: Sidebar.Props, context?: any) {
        super(props, context);
        this.state = {
            isModalOpen: false
        };

    }

    handleOpenModal = () => {
        this.setState({isModalOpen: true});
    };

    handleCloseModal = () => {
        this.setState({isModalOpen: false});
    };

    render() {
        return (
            <SidebarContainer className='col-md-2'>
                <SidebarLink to='/' activeClassName="sidebar-active">Dashboard</SidebarLink>
                <Modal
                    style={modalStyles}
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Modal"
                    ariaHideApp={false}
                >
                    {this.props.projectSchema.length > 0 ?
                    <DynamicForm formSchema={this.props.projectSchema}/> :
                    <p>No Project Schema found</p>
                    }
                </Modal>
                <SidebarModalLink href="#" onClick={this.handleOpenModal}>Create a Project</SidebarModalLink>
                <SidebarLink to='/my-projects' activeClassName="sidebar-active">View My Projects</SidebarLink>
                <SidebarLink to='/service-agents' activeClassName="sidebar-active">Service Agents</SidebarLink>
            </SidebarContainer>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState){
    
}

/* STYLES BELOW */

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        transition     : 'all 0.5s ease'
    },
    content: {
        top        : '50%',
        left       : '50%',
        right      : 'auto',
        bottom     : 'auto',
        marginRight: '-50%',
        transform  : 'translate(-50%, -50%)'
    }
};

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
    
    &:hover {
        background:${props => props.theme.bgLighter};
        color:white;
        text-decoration:none;
    }

    &.sidebar-active {
        border-left:5px solid #0f8dab;
        background:${props => props.theme.bgLightest};
        padding-left:5px;
        color:#0f8dab;
    }
`;

const Link = SidebarLink.withComponent('a')

const SidebarModalLink = Link.extend`
`;