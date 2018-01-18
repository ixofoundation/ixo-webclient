import * as React from 'react';
import * as iso3311a2 from 'iso-3166-1-alpha-2';

export namespace CountrySelect {
  export interface Props {
    text?: string;
    id: string;
  }

  export interface State {
    selectedCountry: string;
  }
}

export default class CountrySelect extends React.Component<CountrySelect.Props, CountrySelect.State> {
    constructor(props?: CountrySelect.Props, context?: any) {
        super(props, context);
    }

    handleChange=(e)=>{
        
        this.setState({selectedCountry: e.target.value});
    }

    render() {
        console.log(iso3311a2.getCountries());
        return (
            <section>
                <label htmlFor={this.props.id}>{this.props.text}</label>
                <select id={this.props.id} onChange={this.handleChange} value="South Africa">
                    <option value="China">China</option>
                    <option value="England">England</option>
                    <option value="South Africa">South Africa</option>
                    <option value="USA">USA</option>
                </select>
            </section>
        );
    }
}