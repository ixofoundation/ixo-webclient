import * as React from 'react';
import styled from 'styled-components';

export interface Props {
    SDGArray: string[]
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

        const goalsList = this.props.SDGArray.map((SDG,index)=>{
            return SDG.split('.')[0]+',';
        })
        
        const goalsWithMeta = [];
        fetch(`https://sdg-api.herokuapp.com/goals?ids=${goalsList}&includeMetadata=true`).then(res=> {return res.json()})
        .then((goals)=>{

            goals.data.forEach((goal,index)=>{
                goalsWithMeta.push(goal);
            });
            this.setState({goalsWithMeta});
        })

    }

    displayGoalsMeta(){

        return this.state.goalsWithMeta.map((goal,index)=>{
            return <p key={index}>{JSON.stringify(goal)}</p>
        });
    }
    
    render() {
        return (
            <div className="col-md-12">
                <h3>Sustainable Development Goals</h3>
                {/* {this.displayGoalsMeta()} */}
            </div>
        );
    }
    
}