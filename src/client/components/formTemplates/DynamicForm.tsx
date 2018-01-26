import * as React    from 'react';
import {connect} from 'react-redux';
import TextArea      from './TextArea';
import InputFile     from './InputFile';
import InputText     from './InputText';
import Select from './Select';
import { IPublicSiteStoreState } from '../../redux/public_site_reducer';

export namespace DynamicForm {
    export interface Props {
        formSchema: any,
        web3Instance?: any,
        ixo?: any
    }

    export interface State {
        formData: any
    }
}

@connect(mapStateToProps)
export default class DynamicForm extends React.Component<DynamicForm.Props, DynamicForm.State>{

    constructor(props?:DynamicForm.Props,context?:any){
        super(props);
        this.state = {
            formData: {}
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
        this.props.ixo.auth.sign(this.props.web3Instance,this.state.formData).then((response)=>{
            console.log(response);
            this.props.ixo.project.createProject(this.props.web3Instance.eth.accounts[0],response,this.state.formData,new Date()).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            })
        }).catch((error)=>{
            console.log(error);
        })
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
                    <input type="submit" className="btn btn-primary" value="Submit Project"/> 
                </div>
            </form>
        );
    }
};

function mapStateToProps(state:IPublicSiteStoreState){
    return {
        web3Instance: state.web3Store.web3Instance,
        ixo: state.ixoStore.ixo
    }
}

