import { createContext, useState } from "react";

export let searchContext = createContext(null);
export function SearchContextProvider(props) {
    let [userData, setData] = useState(null);

    return <searchContext.Provider value={{ userData, setData }}>
        {props.children}
    </searchContext.Provider>
}