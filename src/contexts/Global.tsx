import React from 'react';

const Global = React.createContext({});

export const ProviderGlobal = Global.Provider;
export const ConsumerGlobal = Global.Consumer;

export default Global;