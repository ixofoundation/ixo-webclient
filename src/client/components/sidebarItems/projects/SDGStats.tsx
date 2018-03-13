import * as React from 'react';
import styled from 'styled-components';

export interface Props {
    SDGArray: any
}

export default class SDGStats extends React.Component<Props> {

    constructor(props?:Props){
        super(props);

    }

    displayGoalsMeta(){
        return (
            <div className="row"> 
                {this.props.SDGArray.map((goal,index)=>{
                    return(<SDG className="col-md-2 col-sm-6 col-xs-6" key={index}>
                        <a href={goal.link} target="_blank"><img src={goal.icon_url} /></a>
                    </SDG>);
                })}
            </div>
        )
    }
    
    render() {
        return (
            <div className="col-md-12">
                <H3>Relevant SDGs:</H3>
                {this.displayGoalsMeta()}
            </div>
        );
    }
    
}

const H3 = styled.h3`
    margin-top:20px;
`;

const SDG = styled.div`

    img {
        max-width:100%;

        transition:transform 0.3s ease;
    }

    img:hover {
        transform:scale(1.1);
    }
`;