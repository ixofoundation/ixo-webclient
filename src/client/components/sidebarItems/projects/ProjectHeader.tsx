import * as React from 'react';
import styled from 'styled-components';
import * as iso3311a2 from 'iso-3166-1-alpha-2';
import { FlagIcon, fixCountryCode } from '../../FlagIcon';
import { Link } from 'react-router-dom';

export interface Props {
    country: string,
    name: string
}

export default class SDGStats extends React.Component<Props> {

    constructor(props?:Props){
        super(props);
    }

    getCountryName(countryCode: string): string {
        return iso3311a2.getCountry(fixCountryCode(countryCode).toUpperCase())
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    
                    <ProjectHeader>
                        <Link to="/">&larr; Back to Home</Link>
                        <h1>{this.props.name}</h1>
                        <FlagBox title={this.getCountryName(this.props.country)}>
                            <FlagIcon code={fixCountryCode(this.props.country)} size='3x'></FlagIcon>
                        </FlagBox>
                    </ProjectHeader>
                </div>
            </div>
        );
    }
    
}

const ProjectCard = styled.div`
    background: white;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
    padding: 10px 20px 30px;
    height:100%;
    border-radius:5px;
    border-bottom:5px solid #b6f2ff;

    @media (max-width: 768px){
        margin-bottom:20px;
    }

    .row {
        justify-content: center;
    }

    a {
        color: ${props => props.theme.bgLightest};
        padding:10px;
        display:inline-block;
    }

    p {
        margin-bottom:0;
    }

    .vertical-center {
        justify-content:center;
        align-items:center;
        display:flex;
        flex-direction:column;
    }
`;

const ProjectHeader = ProjectCard.extend`

    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:10px;

    h1,a {
        flex:1;
    }

    h1 {
        text-align:center;
        margin-bottom:0;
        font-size:30px;
        color: #00d2ff;
    }

    a:hover {
        text-decoration:none;

    }
`;

const FlagBox = styled.div`
    padding: 5px;
    flex:1;
    text-align:right;
`;