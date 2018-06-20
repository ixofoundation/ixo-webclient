import * as React from 'react';
import Select from './Select';
import { isoCountries } from '../../lib/commonData';

export default class CountrySelect extends Select {

	generateSelect = () => {
		let selectOptions = [];

		for (let code in isoCountries) {
			if (isoCountries.hasOwnProperty(code)) {
				selectOptions.push(<option key={code} value={code}>{isoCountries[code]}</option>);
			}
		}

		return selectOptions;

	}

}
