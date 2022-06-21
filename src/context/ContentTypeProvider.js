import { createContext, useState } from "react";

const ContentTypeContext = createContext({});

export const ContentTypeProvider = ({ children }) => {
        const [data,setData] = useState('bu bir data')
        

    return (
        <ContentTypeContext.Provider value={{data,setData}}>
            {children}
        </ContentTypeContext.Provider>
    )
}

export default ContentTypeContext;