import * as React from 'react';
import styled from 'styled-components';

export enum TooltipPositions {
	top = 'TOP',
	right = 'RIGHT',
	bottom = 'BOTTOM',
	left = 'LEFT',
}

export interface ParentProps {
	text: string;
	icon?: boolean;
	position?: TooltipPositions;
}

export const Tooltip: React.SFC<ParentProps> = ({text, icon, position, children}) => {

	let positionCss = '';
	let arrowCss = '';
	switch (position) {
		case TooltipPositions.top:
		default:
			positionCss = `
				bottom: calc(100% + 15px);
				left: -10px;
			`;
			arrowCss = `
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-top: 10px solid rgba(0,0,0,0.8);
					bottom: -10px;
					left: 10px;
			`;
			break;
		case TooltipPositions.right:
			positionCss = `
				top: -10px;
				left: calc(100% + 15px);
			`;
			arrowCss = `
					border-right: 10px solid rgba(0,0,0,0.8);
					border-top: 10px solid transparent;
					border-bottom: 10px solid transparent;
					left: -10px;
					top: 10px;
			`;
			break;
		case TooltipPositions.bottom:
			positionCss = `
				top: calc(100% + 15px);
				left: -10px;
			`;
			arrowCss = `
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-bottom: 10px solid rgba(0,0,0,0.8);
					top: -10px;
					left: 10px;
			`;
			break;
		case TooltipPositions.left:
			positionCss = `
				right: calc(100% + 15px);
				top: -10px;
				display: flex;
				justify-content: flex-end;
			`;
			arrowCss = `
					border-top: 10px solid transparent;
					border-left: 10px solid rgba(0,0,0,0.8);
					border-bottom: 10px solid transparent;
					top: 10px;
					right: -10px;
			`;
			break;
		
	}

	const TooltipWrapper = styled.div`
		position: absolute;
		width: 100vw;
		z-index: 1;
		pointer-events: none;
		${positionCss}
	`;

	const TooltipInner = styled.div`
		// opacity: 0;
		padding: 10px;
		border-radius: 5px;
		max-width:300px;
		background: rgba(0,0,0,0.8);
		pointer-events: none;
		display: inline-flex;
		position: relative;

		p {
			color: white;
		}

		:after {
			content: '';
			position: absolute;
			${arrowCss}
		}
	`;

	const Hover = styled.div`
		position: relative;
		${(icon! && icon === true) && 'width: 20px;height:20px;'}

		i {
			font-size: 20px;
			
			:before {
				color: grey;
			}
		}

		:hover {
			${TooltipWrapper} {
				opacity: 1;
			}
		}
	`;

	return (
		<Hover>
			{(icon! && icon === true) ? <i className="icon-pending" /> : children}
			<TooltipWrapper>
				<TooltipInner>
					<p>{text}</p>
				</TooltipInner>
			</TooltipWrapper>
		</Hover>
	);
};