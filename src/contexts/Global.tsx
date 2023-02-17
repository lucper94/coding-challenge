import React,{useState,ReactNode} from 'react';
import data from '../data/data';
import {ContextStates,campuses as campusesType} from './types'
interface Props {
    children?: ReactNode
}

export const Context = React.createContext<ContextStates|null>(null);
export const GlobalProvider = ({ children, ...props }: Props ) => {

    const [country, setCountry] = useState({ name: "", code: "" });
    const [provider, setProvider] = useState("");
    const [campuses, setCampuses] = useState <campusesType[]|[]>(data.campuses);
    const [locations, setLocations] = useState(data.locations);
    const [selectedLocations, setSelectedLocations] = useState<string[]|[]>([]);
    const [step, setStep] = useState<string>('destination');
  	const valueData:ContextStates = {campuses, locations, country, setCountry, selectedLocations, setSelectedLocations, setProvider, provider, step, setStep, setLocations };
    return (
        <Context.Provider value={valueData}>
            {children}
        </Context.Provider>
    );
};



