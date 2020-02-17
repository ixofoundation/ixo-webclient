import * as React from 'react'
import styled from 'styled-components'
import './FilterSortButtons.css'

const PositionController = styled.div`
    position: absolute;
    right: 5%;
    top: 35%;
    margin: 6px;
    font-weight: bold;        
`

const FilterSortButtons = () => {
  return(
    <PositionController>
        <button
            className="btn btn-focus"
            onClick={()=>console.log('Dates')}
            
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
  </PositionController>

    
  );
}
export default FilterSortButtons;