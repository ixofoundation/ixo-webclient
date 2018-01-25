import * as React              from 'react';
import * as Modal              from 'react-modal';
import {connect}               from 'react-redux';
import DynamicForm             from './formTemplates/DynamicForm';
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

    handleOpenModal = (e) => {
        e.preventDefault();
        this.setState({isModalOpen: true});
    };

    handleCloseModal = () => {
        this.setState({isModalOpen: false});
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
        return (
            <SidebarContainer className='col-md-2'>
                <SidebarLink exact to='/'>Dashboard</SidebarLink>
                <Modal
                    style={modalStyles}
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Modal"
                    ariaHideApp={false}
                >
                    {this.state.projectSchema.length > 0 ?
                        <div>
                        <DynamicForm formSchema={this.state.projectSchema}/>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                        </div>:
                        <p>No Project Schema found</p>
                    }
                </Modal>
                <SidebarModalLink href="#" onClick={this.handleOpenModal}>Create a Project</SidebarModalLink>
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
    
    transition:all 0.3s ease;

    &:hover {
        background:${props => props.theme.bgLighter};
        color:white;
        text-decoration:none;
        padding-left:15px;
    }

    &.active {
        border-left:5px solid #0f8dab;
        background:${props => props.theme.bgLightest};
        padding-left:10px;
        color:#0f8dab;
    }
`;

const Link = SidebarLink.withComponent('a');

const SidebarModalLink = Link.extend`
`;