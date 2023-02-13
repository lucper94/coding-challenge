import React, {useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/global.css';
import Global  from '../contexts/Global';

function SearchFields() {

  const {data} = useContext(Global);
  console.log(data?.getAvailableFiltersForLanguageSearch)
  return ( 
    <div className="container text-center">
      <div className="row">
        <div className="col">
         <TextField className="search-field" id="outlined-basic" label="Destination" variant="outlined" />
        </div>
        <div className="col">
        <TextField className="search-field"  id="outlined-basic" label="Provider" variant="outlined" />
        </div>
        <div className="col">
         <TextField className="search-field" id="outlined-basic" label="Min. number of weeks" variant="outlined" />
        </div>
         <div className="col">
         <Button variant="contained">Search</Button>
        </div>
      </div>
    </div>
    ) 
     
    }

export default SearchFields;