import * as React    from 'react';
import {connect} from 'react-redux';
import TextArea      from './TextArea';
import InputFile     from './InputFile';
import InputText     from './InputText';
import Select from './Select';
import { IPublicSiteStoreState } from '../../redux/public_site_reducer';
import styled from 'styled-components';

export namespace DynamicForm {
    export interface Props {
        formSchema: any,
    }

    export interface State {
        formData: any,
        submitStatus: string
    }

    export interface Callbacks {
        handleSubmit: (formData:any) => void
    }

    export interface IProps extends Props, Callbacks {}
}

export default class DynamicForm extends React.Component<DynamicForm.IProps, DynamicForm.State>{

    constructor(props?:DynamicForm.IProps,context?:any){
        super(props);
        this.state = {
            formData: {},
            submitStatus: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        this.props.formSchema.map((field, i) => {
            this.setFormState(field.name, "");
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state.formData);
        // this.props.ixo.auth.sign(this.props.web3Instance,this.state.formData).then((response: any)=>{
        //     this.props.ixo.project.createProject(this.props.web3Instance.eth.accounts[0],response,this.state.formData,new Date()).then((response: any)=>{

        //         if(response.result){
        //             this.setState({
        //                 submitStatus: 'Your project has been submitted successfully',
        //                 formData : {}
        //             });
        //         } else if(response.error){
        //             this.setState({
        //                 submitStatus: 'Error submitting the project, please ensure all fields have been entered',
        //                 formData : {}
        //             });
        //         }
                
        //     }).catch((error)=>{
        //         this.setState({submitStatus: 'Error submitting the project'});
        //     })
        // }).catch((error)=>{
        //     this.setState({submitStatus: 'Error submitting the project'});
        // })
        const target = event.target;
    }

    setFormState = (name: String, value: any) => {

        var fields = name.split(".");
        var formData = this.state.formData;
        var curObj = formData;
        fields.forEach((field, idx) => {
            if(idx == fields.length-1){
                curObj[field] = value;
            }else{
                if(!curObj[field])
                    curObj[field] = {};
                curObj = curObj[field];
            }
        })
        this.setState({formData: formData});
    }

    onFormValueChanged = (name: String) => {
        return (event) => {
            this.setFormState(name, event.target.value);
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    {this.props.formSchema.map((field, i) => {
                        switch (field.type) {
                            case 'text' || 'email':
                                return <InputText id={field.name} type={field.type} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
                            case 'image' :
                                return <InputFile id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
                            case 'textarea' :
                                return <TextArea id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
                            case 'select':
                                return <Select id={field.name} options={field.options} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
                            case 'country':
                                return <Select id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
                            default:
                                return <p>Type not found</p>;
                        }
                    })}
                    <Submit type="submit" value="Submit Form"/> 
                    <SubmitStatus>{this.state.submitStatus}</SubmitStatus>
                </div>
            </form>
        );
    }
};

const Submit = styled.input`
    background: #0f8dab;
    display: block;
    margin: 0 auto;
    color: white;
    border: 0;
    padding: 15px;
    text-transform: uppercase;
    font-size:0.8em;
    transition:all 0.3s ease;
    cursor:pointer;

    &:hover {
        box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.3);
    }
`;

const SubmitStatus = styled.p`
    color:#0f8dab;
    margin-top:10px;
    text-align:center;
`;  