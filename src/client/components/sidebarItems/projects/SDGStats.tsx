import * as React from 'react';
import styled from 'styled-components';

export interface Props {
    SDGArray: any
}

export interface State {
    goalsWithMeta: any[]
}

export default class SDGStats extends React.Component<Props,State> {

    constructor(props?:Props){
        super(props);

        this.state = {
            goalsWithMeta: []
        }
    }

    componentDidMount(){

        const mainGoals = this.props.SDGArray.map((goal,index)=>{
            return goal.split('.')[0];
        });
        const goalsList = this.props.SDGArray.map((SDG,index)=>{
            return SDG.split('.')[0]+',';
        })
        
        fetch(`https://ixo-sdg.herokuapp.com/goals?ids=${goalsList}&indicators=true`).then(res=> {return res.json()})
        .then((goals)=>{
            const goalsWithMeta = [];
            goals.data.forEach((goal,index)=>{
                if(mainGoals.includes(String(goal.goal))){
                    goalsWithMeta.push({
                        title: goal.title, 
                        icon_url: goal.icon_url, 
                        link: goal.targets[0].indicators[0].goal_meta_link
                    });
                }
            });
            this.setState({goalsWithMeta});
        })

    }

    displayGoalsMeta(){
        return (
            <div className="row col-md-12"> 
                {this.state.goalsWithMeta.map((goal,index)=>{
                    return(<SDG className="col-md-2" key={index}>
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