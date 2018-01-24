import * as React    from 'react';
import TextArea      from './TextArea';
import InputFile     from './InputFile';
import InputText     from './InputText';
import Select from './Select';

export namespace DynamicForm {
    export interface Props {
        formSchema: any;
    }

    export interface State {
        formData: any
    }
}

export default class DynamicForm extends React.Component<DynamicForm.Props, DynamicForm.State>{

    constructor(props?:DynamicForm.Props,context?:any){
        super(props);
        this.state = {
            formData: {}
        }
    }

    componentWillMount(){
        this.props.formSchema.map((field, i) => {
            this.setFormState(field.name, "");
        });
    }

    handleSubmit = (event) => {
        const target = event.target;
        event.preventDefault();
        
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
        console.log(formData);
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
                                return <InputFile id={field.type} text={field.label} key={i}/>;
                            case 'textarea' :
                                return <TextArea id={field.type} text={field.label} key={i}/>;
                            case 'select':
                                return <Select id={field.type} options={field.options} text={field.label} key={i}/>;
                            case 'country':
                                return <Select id={field.type} text={field.label} key={i}/>;

                            default:
                                return <p>Type not found</p>;
                        }
                    })}
                    <input type="submit" className="btn btn-primary" value="Submit Project"/> 
                    <button type="button" className="btn btn-primary">Cancel</button>
                </div>
            </form>
        );
    }
};

