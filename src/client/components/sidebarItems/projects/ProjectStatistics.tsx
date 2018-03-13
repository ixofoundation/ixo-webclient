import * as React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

export namespace ProjectStatistics{

    export interface Callbacks {
        getClaimStatistics: () => any,
        getCountClaimsOfType: (string) => number,
        getCountAgentsOfRole: (string) => number
    }

    export interface Props {
        successfulClaims: number
    }

    export interface IProps extends Props,Callbacks {

    }
}

export default class ProjectStatistics extends React.Component<ProjectStatistics.IProps> {

    constructor(props?:ProjectStatistics.IProps){
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <H2>Project Statistics:</H2>
                </div>
                <div className="col-xl-4 col-md-6 ">
                    <p>Claims breakdown (%)</p>
                    {this.props.getClaimStatistics()}
                </div>
                <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                    <p>Successful Claims</p>
                    <Number>{this.props.getCountClaimsOfType('Approved')}/{this.props.successfulClaims}</Number>
                </div>
                <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                    <p>Evaluation Agents</p>
                    <Number>{this.props.getCountAgentsOfRole('EA')}</Number>
                </div>
                <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                    <p>Service Agents</p>
                    <Number>{this.props.getCountAgentsOfRole('SA')}</Number>
                </div>
                <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                    <p>Investor Agents</p>
                    <Number>{this.props.getCountAgentsOfRole('IA')}</Number>
                </div>
            </div>
        );
    }
    
}

const Number = styled.p`
    font-size:40px;
    font-weight:bold;
    text-align:center;
`

const H2 = styled.h2`
    font-size: 28px;
    margin-top: 15px;
`;