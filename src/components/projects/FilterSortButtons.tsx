import * as React from 'react'
import styled from 'styled-components'
import '../../assets/filter_sort_buttons.css'
import './DatePicker'
import DatePicker from './DatePicker'

const PositionController = styled.div`
    position: absolute;
    right: 5%;
    top: 35%;
    margin: 6px;
    font-weight: bold;        
`

class FilterSortButtons extends React.Component<{}, { showComponent: boolean }>{
  constructor(props){
    super(props);
    this.state ={
      showComponent: false
    };
  }

  showDatePicker = (e) =>{
    e.preventDefault();
    this.setState({
      showComponent: true
    })
  }

 render(){
  return(
    <PositionController>
        <button
            className="btn btn-focus"
            onClick={this.showDatePicker} 
        >
            <i className="icon-calendar-sort"></i>
            Dates
        </button>
        <button className="btn btn-focus" onClick={()=>console.log('Beneficiary')}>Beneficiary</button>
        <button className="btn btn-focus" onClick={()=>console.log('Field')}>Field</button>
        <button className="btn btn-focus"onClick={()=>console.log('SDG')}>SDG</button>
        <button className="btn btn-focus" onClick={()=>console.log('Stage')}>Stage</button>
        <button
          className="btn btn-focus"
          onClick={()=>console.log('Reset')}>
            <i className="icon-reset"></i>
            Reset</button> 
  {this.state.showComponent ? <DatePicker/> : null}
  </PositionController>

  );
 }
}
export default FilterSortButtons;