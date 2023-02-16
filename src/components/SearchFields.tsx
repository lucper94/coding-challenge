import React, {useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/global.css';
import {Context} from '../contexts/Global';
import {ContextStates, country} from '../contexts/types'

function SearchFields() {
    const countries = require('country-data').countries;
    const {locations, setCountry, setProvider, setStep} = useContext(Context)as ContextStates;
    var resArr : any[] = [];
    useEffect(() => {

        if (locations) {

            const locationArray = locations.map((item) => {
                return {
                    code: item.country,
                    name: countries[item.country].name
                }
            })

            locationArray.forEach(function (item) {
                var i = resArr.findIndex(x => x.name.toLowerCase() == item.name.toLowerCase());
                if (i <= -1) {
                    resArr.push(item);
                }
            })

        }
    });

    const onChangeDestination = (event : any) => {
        const destination = event.target.value
        setStep('destination')
        if (destination.length > 2) {

            const countryData : country[] = resArr.filter((item) => {
                return item
                    ?.name
                    .toLowerCase()
                    .includes(destination.toLowerCase())
            })

            if (countryData.length > 0) {
                setCountry(countryData[0])
            }

        } else {
            setCountry({name: "", code: ""})
        }
    }

    const onChangeProvider = (event : any) => {
        const provider = event.target.value
        setStep('provider')
        setProvider(provider)
    }
    const onBlurDestination = (event : any) => {
      setStep('blurDestination')
    }
    const onBlurProvider = (event : any) => {
      setStep('blurProvider')
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <TextField
                        className="search-field"
                        onChange={onChangeDestination}
                        onClick={onBlurDestination}
                        id="outlined-basic"
                        label="Destination"
                        variant="outlined"/>
                </div>
                <div className="col">
                    <TextField
                        className="search-field"
                        onChange={onChangeProvider}
                        onClick={onBlurProvider}
                        id="outlined-basic"
                        label="Provider"
                        variant="outlined"/>
                </div>
                <div className="col">
                    <TextField
                        className="search-field"
                        id="outlined-basic"
                        label="Min. number of weeks"
                        variant="outlined"/>
                </div>
                <div className="col">
                    <Button variant="contained">Search</Button>
                </div>
            </div>
        </div>
    )

}

export default SearchFields;