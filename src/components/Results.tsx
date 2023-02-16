import React, {useContext, useEffect, useState} from 'react';
import '../styles/global.css';
import {ContextStates, locations as locationType, campuses as campusesType} from '../contexts/types'
import {Context} from '../contexts/Global';
import { BsCheckLg, BsFillFlagFill, BsXLg } from "react-icons/bs";
import Card from '@mui/material/Card';

function Results() {

    const {
        country,
        locations,
        selectedLocations,
        setSelectedLocations,
        provider,
        campuses,
        step
    } = useContext(Context)as ContextStates;
    const [currentLocations,
        setCurrentLocations] = useState < locationType[] | [] > ([]);
    const [currentCampuses,
        setCurrentCampuses] = useState < campusesType[] | [] > ([]);
    const [selectedLocationsName,
        setSelectedLocationsName] = useState < string[] | [] > ([]);
    const [isDeleteLocation,
        setIsDeleteLocation] = useState < boolean > (false);
    const [locationsNumber,
        setLocationNumber] = useState < number > (0);
    const [campusesNumber,
        setCampusesNumber] = useState < number > (0);

    useEffect(() => {
        for (let a = 0; a < locations.length; a++) {
          campuses.map((campus) =>{
            if(campus.location.id ===  locations[a].id){
              campus.cityCountry = locations[a].name
            }
            return campus
          })
        }

        const checkedLocations:locationType[] = currentLocations.filter((item) => {
          return item?.checked === true
        })
        if (checkedLocations.length > 0) {
            var campusesArray:campusesType[] = []
            for (let i = 0; i < checkedLocations.length; i++) {
                const filterCampuses:campusesType[] = campuses.filter((item) => {
                  return item?.location?.id === checkedLocations[i].id
                }).filter((campus) => {
                  return campus.name.toLowerCase().includes(provider.toLowerCase())
                })
                campusesArray = [...campusesArray, ...filterCampuses]
              
            }
            setCurrentCampuses(campusesArray);
        }else {
          setCurrentCampuses(campuses)
        }

    }, [currentLocations, country, provider, selectedLocations])

    useEffect(() => {
        if (isDeleteLocation) {
            
        }else{
          selectedLocations.map((id, index) => {
              locations.map((location) => {
                  if (location.id === id) 
                      setSelectedLocationsName([
                          ...selectedLocationsName,
                          location.name
                      ])
              })
          })
          setLocationNumber(selectedLocations.length)
        }

    }, [selectedLocations])

    useEffect(() => {
      if(step == 'blurDestination') {
        setCurrentLocations(locations)
      }
      const checkedLocations:locationType[] = currentLocations.filter((item) => {
        return item?.checked === true
      })
      if(step == 'blurProvider' && checkedLocations.length == 0) {
        setCurrentCampuses(campuses)
      }
  }, [step])

    const onClickLocation = (event : any) => {
        setIsDeleteLocation(false)
        const index = event
            .currentTarget
            .getAttribute("data-value")
       
        if(!currentLocations[index].checked){
          currentLocations[index].checked = true;
          setCurrentLocations(currentLocations)
        }
        if (selectedLocations.length < 2) {
            setSelectedLocations([
                ...selectedLocations,
                currentLocations[index].id
            ])
        }
    }

    const onClickCampuses = (event : any) => {
        const index = event
            .currentTarget
            .getAttribute("data-value")
        const checkedCampuses:campusesType[] = currentCampuses.filter((item) => {
          return item?.checked === true
        })
        if(!currentCampuses[index].checked && checkedCampuses.length<2){
          currentCampuses[index].checked = true;
          setCurrentCampuses(currentCampuses)
          setCampusesNumber((campusesNumber) => campusesNumber + 1)
        }
       
    }

    const deleteParents = (parentId:string) => {
      const parentsArray : campusesType[] = currentCampuses.map((campus)=> {
        if( campus.location.id == parentId){
          campus.checked = false
        }
        return campus
      })
      setCurrentCampuses(parentsArray)
      const checkedCampuses:campusesType[] = currentCampuses.filter((item) => {
        return item?.checked === true
      })
      setCampusesNumber(checkedCampuses.length)
    }

    const deleteLocation = (event : any) => {
        setIsDeleteLocation(true)
        const index:number = event
            .currentTarget
            .getAttribute("data-value")
            deleteParents(selectedLocations[index])
          let locationCopy:locationType[] = locations.map((item, i) => {
          if(item.id === selectedLocations[index]){
            item.checked=false
          }
          return item
        })
        setCurrentLocations(locationCopy)
      
        const locationArray : string[] = selectedLocations;
        const locationNameArray : string[] = selectedLocationsName;
        let locationFilter : string[] = locationArray.filter((item, i) => i != index)
        let locationNameFilter : string[] = locationNameArray.filter((item, i) => i != index)
        setLocationNumber((locationsNumber) => locationsNumber - 1)
        setSelectedLocations(locationFilter)
        setSelectedLocationsName(locationNameFilter)
    }

    const deleteCampus = (event : any) => {
        const id = event
            .currentTarget
            .getAttribute("data-value")
        const campusesCopy : campusesType[] = currentCampuses.map((campus)=> {
          if( campus.id == id){
            campus.checked = false
          }
          return campus
        })
        setCampusesNumber((campusesNumber) => campusesNumber - 1)
        setCurrentCampuses(campusesCopy)
      
    }

    return (
      <Card variant="outlined" className='mt-2'>
        <div className="container text-center result-container">
            {(step === 'destination' || step === 'blurDestination') && (
                <div className="row">
                    <div className="col results">
                        <div className="column">
                            <div className="col">
                                <b>Results</b>
                            </div>
                            <div className="col">
                                {country.name && (
                                    <span><BsFillFlagFill/>{country.name} </span>
                                )}
                            </div>
                            <div className="col">
                                {currentLocations.map((location, index) => (
                                    <div
                                        data-value={index}
                                        key={index}
                                        className="column"
                                        onClick={onClickLocation}>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    {location.name}
                                                </div>
                                                {location
                                                    ?.checked === true && (
                                                        <div className="col">
                                                            <BsCheckLg/>
                                                        </div>
                                                    )}
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
                                <b>Selected (<>{locationsNumber}</>)</b>
                        </div>
                        <div className="col">
                            {selectedLocationsName.map((location, index) => (
                                <div data-value={index} key={index} className="column" onClick={deleteLocation}>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                {location}
                                            </div>
                                            <div className="col">
                                              <BsXLg/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
            {(step == 'provider' || step === 'blurProvider') && (
                <div className="row">
                    <div className="col results">
                        <div className="column">
                            <div className="col">
                                <b>Campuses</b>
                            </div>
                            <div className="col">
                                {currentCampuses.map((campus, index) => (
                                    <div
                                        data-value={index}
                                        key={index}
                                        className="column"
                                        onClick={onClickCampuses}>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    {campus.name}
                                                </div>
                                               
                                                {campus
                                                    ?.checked == true && (
                                                    <div className="col">
                                                        <BsCheckLg/>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                   <small> {campus.cityCountry}</small>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col selected">
                            <div className="column">
                                <div className="col">
                                    <b>Selected (<>{campusesNumber})</>
                                </b>
                            </div>
                            <div className="col">
                                {currentCampuses.map((campus, index) => {
                                   if(campus?.checked == true ){
                                    return (
                                      <div data-value={campus.id} key={index} className="column" onClick={deleteCampus}>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    {campus.name}
                                                </div>
                                                <div className="col">
                                                  <BsXLg/>
                                                </div>
                                            </div>
                                        </div>
                                     </div>
                                      )
                                    }
                                   
                                  })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            )}
        </div>
      </Card>
    )

}

export default Results;
