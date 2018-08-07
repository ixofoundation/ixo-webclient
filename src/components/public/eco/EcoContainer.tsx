import * as React from 'react';
import { EcoBanner } from './EcoBanner';
import { EcoCollection } from './EcoCollection';

export interface ParentProps { }

export const EcoContainer: React.SFC<ParentProps> = (props) => {
	return (
		<React.Fragment>
			<EcoBanner />
			<EcoCollection />
		</React.Fragment>
	);
};