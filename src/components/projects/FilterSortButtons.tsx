import * as React from 'react'



const FilterSortButtons = () => {
  return(
    <div>
        <button onClick={()=>console.log('Button clicked')}>Dates</button>
        <button onClick={()=>console.log('Button clicked')}>Beneficary</button>
        <button onClick={()=>console.log('Button clicked')}>Field</button>
        <button onClick={()=>console.log('Button clicked')}>SDG</button>
        <button onClick={()=>console.log('Button clicked')}>Stage</button>
        <button onClick={()=>console.log('Button clicked')}>Reset</button>
    </div>
    
  );
}
export default FilterSortButtons;