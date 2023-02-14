import React from 'react';
import SearchFields from './SearchFields';
import Results from './Results';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import data from '../data/data';

function SearchForm() {

  return ( 
    <>
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
    </>
    ) 
     
    }

export default SearchForm;