import React, {useContext, useEffect, useState} from 'react';
import '../styles/global.css';
import {ContextStates, locations as locationType, campuses as campusesType} from '../contexts/types'
import {Context} from '../contexts/Global';
import { BsCheckLg } from "react-icons/bs";
import {BsXLg} from "react-icons/bs";

function Results() {

    const {
        country,
        locations,
        selectedLocations,
        setSelectedLocations,
        provider,
        campuses,
        setProvider,
        step,
        selectedCampuses,
        setSelectedCampuses
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
        if (currentLocations.length === 0 && country.name.length > 2) {
            const locationsFilter : locationType[] = locations.filter((item) => {
                return item.country === country.code
            })
            setCurrentLocations(locationsFilter)
        } else if (country.name.length < 3 && currentLocations.length > 0) {
            setCurrentLocations([])
        }

        if (provider.length > 2) {
            const campusData : campusesType[] = campuses.filter((item) => {
                return item?.name.toLowerCase().includes(provider.toLowerCase())
            })
            console.log(campusData)
            setCurrentCampuses(campusData)
        } else {
            setProvider('')
        }

    }, [currentLocations, country, provider])

    useEffect(() => {
        if (!isDeleteLocation) {
            console.log(selectedLocations)
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


    const onClickLocation = (event : any) => {
        setIsDeleteLocation(false)
        const index = event
            .currentTarget
            .getAttribute("data-value")
        console.log(event)
       
        currentLocations[index].checked = true;
        setCurrentLocations(currentLocations)
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
        console.log(event)
        const newArray : boolean[] = checkedCampuses
        newArray[index] = true;
        setCheckedCampuses(newArray)
        if (selectedCampuses.length < 2) {
            setSelectedCampuses([
                ...selectedCampuses,
                currentCampuses[index].name
            ])
            console.log(selectedCampuses)
        }
        setCampusesNumber((campusesNumber) => campusesNumber + 1)
    }

    const deleteLocation = (event : any) => {
        setIsDeleteLocation(true)
        const index:number = event
            .currentTarget
            .getAttribute("data-value")
            console.log(index)
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
        const index = event
            .currentTarget
            .getAttribute("data-value")
        const checkedCampusesArray : boolean[] = checkedCampuses
        checkedCampusesArray[index] = false;
        setCheckedCampuses(checkedCampusesArray)
        const campusArray : string[] = selectedCampuses;
        let newArray : string[] = campusArray.filter((item, i) => i !== index)
        setSelectedCampuses(newArray)
        setCampusesNumber((campusesNumber) => campusesNumber - 1)
        console.log(newArray)
    }

    return (
        <div className="container text-center result-container">
            {step === 'destination' && (
                <div className="row">
                    <div className="col results">
                        <div className="column">
                            <div className="col">
                                <b>Results</b>
                            </div>
                            <div className="col">
                                {country.name && (
                                    <span>{country.name}</span>
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
            {step == 'provider' && (
                <div className="row">
                    <div className="col results">
                        <div className="column">
                            <div className="col">
                                <b>Campuses</b>
                            </div>
                            <div className="col">
                                {currentCampuses.map((location, index) => (
                                    <div
                                        data-value={index}
                                        key={index}
                                        className="column"
                                        onClick={onClickCampuses}>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    {location.name}
                                                </div>
                                                {checkedCampuses[index] == true && (
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
                        <div className="col selected">
                            <div className="column">
                                <div className="col">
                                    <b>Selected (<>{campusesNumber})</>
                                </b>
                            </div>
                            <div className="col">
                                {selectedCampuses.map((campus, index) => (
                                    <div data-value={index} key={index} className="column" onClick={deleteCampus}>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    {campus}
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

            </div>
            )}
        </div>
    )

}

export default Results;
