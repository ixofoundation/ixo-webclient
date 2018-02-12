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
import Select from './formTemplates/Select'

export namespace Sidebar {
    export interface Props {
        ixo?: any,
        web3Instance?: any
    }

    export interface State {
        isModalOpen: boolean,
        projectSchema: any,
        submitStatus: string
    }

    export interface IProps extends Props {

    }
}

const templateList = ["default","second","third"];

@withRouter
@connect(mapStateToProps)
export class Sidebar extends React.Component<Sidebar.IProps, Sidebar.State> {
    constructor(props?: Sidebar.Props, context?: any) {
        super(props, context);
        this.state = {
            isModalOpen: false,
            submitStatus: '',
            projectSchema: []
        };

    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus });
    };

    // componentDidUpdate(prevProps: App.Props) {
        // if (prevProps.ixo !== this.props.ixo) {
        // componentDidMount(){
    handleLoadTemplate = (templateName) => {
        this.props.ixo.project.getProjectTemplate(templateName).then((response: any) => {
            const projectSchema = response.result.form.fields;
            if (projectSchema !== this.state.projectSchema) {
                this.setState({projectSchema: projectSchema});
            }
        }).catch((result: Error) => {
            this.setState({projectSchema: []});
        });
    }
        // }
        // }
    // }

    handleSubmit = (formData) => {
        let submitStatus = '';
        this.props.ixo.credetialProvider.sign(formData).then((response: any) => {
            this.props.ixo.project.createProject(formData, 'default').then((response: any) => {
                if (response.result) {
                    this.setState({ submitStatus: 'Your project has been submitted successfully' });
                    // formData : {}
                } else if (response.error) {
                    this.setState({ submitStatus: 'Error submitting the project, please ensure all fields have been entered' });
                    // formData : {}
                }

            }).catch((error) => {
                this.setState({ submitStatus: 'Error submitting the project' });
            })
        }).catch((error) => {
            this.setState({ submitStatus: 'Error submitting the project' });
        })
    }

    handleRenderCreateProject = () =>{
        if(this.state.projectSchema.length > 0){
            
             return <DynamicForm formSchema={this.state.projectSchema} handleSubmit={this.handleSubmit}/> 
        }
    }

    handleTemplateChange = (event) => {
        this.handleLoadTemplate(event.target.value);
    }

    render() {

        return (
            <SidebarContainer className='col-md-2'>
                <SidebarLink exact to='/'>Dashboard</SidebarLink>
                <SidebarModalLink href="#" onClick={() => this.handleToggleModal(true)}>Create a Project</SidebarModalLink>
                <SidebarLink exact to='/my-projects'>View My Projects</SidebarLink>
                <SidebarLink to='/service-agents'>Service Agents</SidebarLink>
                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>
                    <Select id="templateSelect" options={templateList} text="Template" onChange={(event)=>this.handleTemplateChange(event)}/>
                    {this.handleRenderCreateProject()}
                    <SubmitStatus>{this.state.submitStatus}</SubmitStatus>
                </ModalWrapper>
            </SidebarContainer>
        );
    }
}


function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
        web3Instance: state.web3Store.web3Instance
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

const SidebarLink = styled(NavLink) `
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

const SubmitStatus = styled.p`
    color:#0f8dab;
    margin-top:10px;
    text-align:center;
`;  

