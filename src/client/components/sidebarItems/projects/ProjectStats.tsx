import * as React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import SingleStatistic from './SingleStatistic';

export namespace ProjectStats{

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

export default class ProjectStats extends React.Component<ProjectStats.IProps> {

    constructor(props?:ProjectStats.IProps){
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
                <SingleStatistic title="Successful Claims" number={`${this.props.getCountClaimsOfType('Approved')}/${this.props.successfulClaims}`}/>
                <SingleStatistic title="Evaluation Agents" number={this.props.getCountAgentsOfRole('EA')}/>
                <SingleStatistic title="Service Agents" number={this.props.getCountAgentsOfRole('SA')}/>
                <SingleStatistic title="Investor Agents" number={this.props.getCountAgentsOfRole('IA')}/>
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
    font-size: 1.8em;
    color: #00d2ff;
    margin-top: 15px;
`;