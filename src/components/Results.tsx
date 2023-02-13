import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/global.css';

function Results() {
  return ( 
    <div className="container text-center result-container">
      <div className="row">
        <div className="col results">
          <div className="column">
            <div className="col">
              <b>Results</b>
            </div>
            <div className="col">
             <span>Canada</span>
            </div>
            <div className="col">
            <div className="column">
            <div className="col">
             ABBBB
            </div>
           </div>
           <div className="column">
              <div className="col">
               ABBBB
              </div>
           </div>
          </div>
      </div>
      </div>
      <div className="col selected">
          <div className="column">
            <div className="col">
              <b>Selected (0)</b>
            </div>
            <div className="col">
             <span>No locations selected.</span>
            </div>
            <div className="col">
            <div className="column">
            <div className="col">
             ABBBB
            </div>
           </div>
           <div className="column">
              <div className="col">
               ABBBB
              </div>
           </div>
          </div>
      </div>
      </div>
    </div>
      </div>
    ) 
     
    }

export default Results;