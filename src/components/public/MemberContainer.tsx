import * as React from 'react';
import { MemberBanner } from './MemberBanner';
import { MemberBenefits } from './MemberBenefits';

export interface ParentProps {
	title: string;
}

export const MemberContainer: React.SFC<ParentProps> = (props) => {
	return (
		<React.Fragment>
			<MemberBanner />
			<MemberBenefits />
		</React.Fragment>
	);
};