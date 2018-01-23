import * as React    from 'react';
import TextArea      from './TextArea';
import InputFile     from './InputFile';
import InputText     from './InputText';
import Select from './Select';

export namespace DynamicForm {
    export interface formProps {
        formSchema: any;
    }
}

const DynamicForm: React.SFC<DynamicForm.formProps> = (props) => {

    return (
        <form>
            <div className="form-group">
                {props.formSchema.map((field, i) => {
                    switch (field.type) {
                        case 'text' || 'email':
                            return <InputText id={field.type} type={field.type} text={field.label} key={i}/>;
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
                <button type="button" className="btn btn-primary">Save</button> 
                <button type="button" className="btn btn-primary">Cancel</button>
            </div>
        </form>
    );
};

export default DynamicForm;