import React, {useContext,useEffect,useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/global.css';
import {Prueba,locat} from '../contexts/types'
import {Context}  from '../contexts/Global';

function Results() {

  const {country,locations} = useContext(Context) as Prueba;
  const [currentLocations, setCurrentLocations] = useState<locat[]|[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<boolean[]|[]>([]);

  useEffect(() => {
    if(currentLocations.length == 0 && country.name.length > 2 ){
         const locationsFilter:locat[] = locations.filter((item)=>{
          return item.country === country.code
          })
        setSelectedLocations(new Array(locationsFilter.length).fill(false))
        setCurrentLocations(locationsFilter)
    }else if(country.name.length < 3 && currentLocations.length > 0){
      setCurrentLocations([])
    }
 

  },[currentLocations,country])

    const onClickLocation = (event:any) => {
    const selectedLocation = event.currentTarget.getAttribute("data-value")
    console.log(event.currentTarget)
    const newArray = selectedLocations
    newArray[selectedLocation] = true;
    setSelectedLocations(newArray)
    console.log(selectedLocations)
  }

  return ( 
    <div className="container text-center result-container">
      <div className="row">
        <div className="col results">
          <div className="column">
            <div className="col">
              <b>Results</b>
            </div>
            <div className="col">
             {country.name&&(<span>{country.name}</span>)}
            </div>
            <div className="col">
            {currentLocations.map((location, index) => (
                   <div data-value={index} key={index} className="column"  onClick = {onClickLocation}>
                    <div className="col">
                     <div className="row">
                        <div className="col">
                          {location.name}
                        </div>
                        {(selectedLocations[index])&&(<div className="col" >
                          *
                        </div>)}
                      </div>
                    </div>
                   </div>
              ))}
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
            <div className="column" >
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