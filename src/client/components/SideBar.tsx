import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import DynamicForm from './formTemplates/DynamicForm';
import { ModalWrapper } from './ModalWrapper';
import styled from 'styled-components';
import { IPublicSiteStoreState } from '../redux/public_site_reducer';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { App } from '../containers/App';
import TemplateSelect from './formTemplates/TemplateSelect'
import { renderIf } from '../utils/react_utils';
import { slide as Menu } from 'react-burger-menu';

export namespace Sidebar {
    export interface Props {
        ixo?: any,
    }

    export interface State {
        isMenuOpen: boolean,
        isModalOpen: boolean,
        projectSchema: any,
        submitStatus: string
    }

    export interface IProps extends Props {
    }
}

const templateList = { default: "default", second: "second", third: "third" }

@withRouter
@connect(mapStateToProps)
export class Sidebar extends React.Component<Sidebar.IProps, Sidebar.State> {
    constructor(props?: Sidebar.Props, context?: any) {
        super(props, context);
        this.state = {
            isMenuOpen: false,
            isModalOpen: false,
            submitStatus: '',
            projectSchema: [],
        };
    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus, isMenuOpen: false });
    };

    closeMenu(){
        this.setState({ isMenuOpen: false });
    };

    handleLoadTemplate = (templateName) => {
        this.props.ixo.project.getProjectTemplate(templateName).then((response: any) => {
            const projectSchema = response.result.form.fields;
            if (projectSchema !== this.state.projectSchema) {
                this.setState({ projectSchema: projectSchema });
            }
        }).catch((result: Error) => {
            this.setState({ projectSchema: [] });
        });
    }

    handleSubmit = (formData) => {
        let submitStatus = '';
        this.props.ixo.project.createProject(formData, 'default').then((response: any) => {
            if (response.result) {
                this.setState({ submitStatus: 'Your project has been submitted successfully' });
            } else if (response.error) {
                this.setState({ submitStatus: 'Error submitting the project, please ensure all fields have been entered' });
            }
        }).catch((error) => {
            this.setState({ submitStatus: 'Error submitting the project' });
        })
    }

    handleRenderCreateProject = () => {
        if (this.state.projectSchema.length > 0) {
            return <DynamicForm formSchema={this.state.projectSchema} handleSubmit={this.handleSubmit} />
        }
    }

    handleTemplateChange = (event) => {
        this.handleLoadTemplate(event.target.value);
    }

    renderModal() {
        return <div>
            {renderIf(this.props.ixo && this.props.ixo.credentialProvider.getDid(), {
                ifTrue: () => (
                    <div>
                        <TemplateSelect id="templateSelect" options={templateList} text="Template" onChange={(event) => this.handleTemplateChange(event)} />
                        {this.handleRenderCreateProject()}
                        <SubmitStatus>{this.state.submitStatus}</SubmitStatus>
                    </div>
                ),
                ifFalse: () => (
                    <div>
                        Please login to Metamask to perform this action.
                    </div>
                )
            })}
        </div>
    }

    render() {
        return (
            <Menu isOpen={this.state.isMenuOpen} styles={menuStyle}>
                <SidebarLink exact to='/' onClick={() => this.closeMenu()}>Dashboard</SidebarLink>
                <SidebarModalLink href="#" onClick={() => this.handleToggleModal(true)}>Create a Project</SidebarModalLink>
                <SidebarLink exact to='/my-projects' onClick={() => this.closeMenu()}>View My Projects</SidebarLink>
                <SidebarLink to='/service-agents' onClick={() => this.closeMenu()}>Service Agents</SidebarLink>
                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>
                    {this.renderModal()}
                </ModalWrapper>
            </Menu>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
    };
}

var menuStyle = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '26px',
      top: '81px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }


/* STYLES BELOW */

const SidebarLink = styled(NavLink) `
    display:block;
    color:white;
    padding:10px;
    
    transition:all 0.3s ease;

    &:hover {
        color:white;
        border-left:5px solid #0f8dab;
        padding-left:10px;
        text-decoration:none;
        cursor:pointer;
    }

    &.active {
        color:#0f8dab;
        border-left:5px solid #0f8dab;
        padding-left:10px;
    }
`;

const Link = SidebarLink.withComponent('a');
const SidebarModalLink = SidebarLink.withComponent('div');

const SubmitStatus = styled.p`
    color:#0f8dab;
    margin-top:10px;
    text-align:center;
`;

