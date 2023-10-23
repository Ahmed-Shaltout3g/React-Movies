import { createContext, useState } from "react";

export let authContext = createContext(null);
export function AuthContextProvider(props) {
    let [userData, setData] = useState(null);

    return <authContext.Provider value={{ userData, setData }}>
        {props.children}
    </authContext.Provider>
}