import React,{useEffect,useState,ReactNode} from 'react';
import data from '../data/data';
import {Prueba} from './types'
interface Props {
    children?: ReactNode
}

export const Context = React.createContext<Prueba|null>(null);
export const GlobalProvider = ({ children, ...props }: Props ) => {

    const [country, setCountry] = useState({ name: "", code: "" });
    const [campuses, setCampuses] = useState(data.campuses);
    const [locations, setLocations] = useState(data.locations);
  	const valueData:Prueba = {campuses, locations, country, setCountry };
    return (
        <Context.Provider value={valueData}>
            {children}
        </Context.Provider>
    );
};

