import * as React from 'react';
import * as iso3311a2 from 'iso-3166-1-alpha-2';

export namespace Select {
  export interface Props {
    text?: string;
    id: string;
    options?: any
  }

  export interface State {
    selectedCountry: string;
  }

  export interface Callbacks {
      onChange
  }

  export interface IProps extends Props, Callbacks {

  }
}

export default class Select extends React.Component<Select.IProps, Select.State> {
    constructor(props?: Select.IProps, context?: any) {
        super(props, context);
    }

    handleChange = (e) => {
        
        this.setState({selectedCountry: e.target.value});
    }

    generateSelect = () => {

        let selectOptions = [];

        if(this.props.options == null){
            const countryList = iso3311a2.getData();

            for(var code in countryList){
                if(countryList.hasOwnProperty(code) ) {
                    selectOptions.push(<option key={code} value={code}>{countryList[code]}</option>);
                } 
            }
        }
        else {
            this.props.options.map((option,index)=>{
                selectOptions.push(<option key={index} value={option}>{option.label}</option>); 
            })
        }

        return selectOptions;

    }

    render() {

        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.text}</label>
                <select className="custom-select" id={this.props.id} onChange={this.props.onChange}>
                    {this.generateSelect()}
                </select>
            </div>
        );
    }
}