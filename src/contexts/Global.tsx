import React,{useEffect,useState,ReactNode} from 'react';
import data from '../data/data';
import {ContextStates} from './types'
interface Props {
    children?: ReactNode
}

export const Context = React.createContext<ContextStates|null>(null);
export const GlobalProvider = ({ children, ...props }: Props ) => {

    const [country, setCountry] = useState({ name: "", code: "" });
    const [provider, setProvider] = useState("");
    const [campuses, setCampuses] = useState(data.campuses);
    const [locations, setLocations] = useState(data.locations);
    const [selectedLocations, setSelectedLocations] = useState<string[]|[]>([]);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]|[]>([]);
    const [step, setStep] = useState<string>('destination');
  	const valueData:ContextStates = {campuses, locations, country, setCountry, selectedLocations, setSelectedLocations, setProvider, provider, step, setStep, selectedCampuses, setSelectedCampuses };
    return (
        <Context.Provider value={valueData}>
            {children}
        </Context.Provider>
    );
};



