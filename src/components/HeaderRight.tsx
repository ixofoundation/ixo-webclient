import * as React from 'react';
import styled from 'styled-components';
const xIcon = require('../assets/images/x-icon.png');

const ArrowDown = styled.div`
	border: solid white;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 5px;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
	margin-left:20px;
	margin-bottom:5px;
`;

const IXO = styled.div`
	
	font-size:35px;
	line-height: 46px;
	
	img {
		width:25px;
		height:25px;
		margin-top:-6px;
	}
`;

const UserBox = styled.div`
	height: 90px;
	width: 160px;
	display: flex;
	padding: 0 10px;
	align-items:center;
	justify-content:center;
	border-left: 1px solid #3C3D3D;
	position:relative;

	h3 {
		font-size:18px;
	}
`;

const UserMenu = styled.div`
	position: absolute;
	top:100%;
	width: 320px;
	right:0;
`;

const MenuTop = styled.div`
	background-color: #002233;
	padding:13px 26px;
	font-size:18px;
`;

const MenuBottom = styled.div`
	background-color: #01151F;
	padding:13px 26px;
`;

const NoPadLeft = styled.div`
	padding-right:0;
`;

interface HeaderRightProps {
	selectedServer: string;
	did: string;
	renderStatusIndicator: () => JSX.Element;
	handleServerChange: (event: any) => void;
}

export const HeaderRight: React.SFC<HeaderRightProps> = (props) => {
	return (
		<NoPadLeft className="col-6 d-flex justify-content-end">
			<div>
				{props.renderStatusIndicator()}
				<select value={props.selectedServer} onChange={props.handleServerChange}>
					<option value="https://ixo-node.herokuapp.com">Production
						Server
						</option>
					<option value="http://localhost:5000">Development Server</option>
				</select>
				<IXO><img src={xIcon} alt="IXO" /> 0.567</IXO>
			</div>
			<UserBox>
				<h3>Michael <ArrowDown /></h3>
				<UserMenu>
					<MenuTop>
						Michael
						{props.did}
					</MenuTop>
					<MenuBottom>
						t
					</MenuBottom>
				</UserMenu>
			</UserBox>
		</NoPadLeft>
	);
};