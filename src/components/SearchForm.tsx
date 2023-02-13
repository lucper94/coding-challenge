import React from 'react';
import SearchFields from './SearchFields';
import Results from './Results';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Global from '../contexts/Global';
import data from '../data/data';


function SearchForm() {
  const [isdata, setIsdata] = useState({});

  useEffect(() => {
    setIsdata(data())
    console.log(isdata)
  }, [])

  return ( 
    <>
      {(isdata&&<Global.Provider value={isdata} >
        <div className="container text-center">
          <div className="column">
            <div className="col">
              <SearchFields></SearchFields>
            </div>
            <div className="col">
              <Results></Results>
            </div>
            <div className="col">
            </div>
             <div className="col">
              <Button color="secondary">Cancel</Button><Button color="secondary">Confirm</Button>
            </div>
          </div>
        </div>
      </Global.Provider >)}
    </>
    ) 
     
    }

export default SearchForm;