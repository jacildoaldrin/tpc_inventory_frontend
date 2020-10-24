import target from 'api/api.target';
import Axios from 'axios';
import React from 'react'

const StorageContext = React.createContext();

export const useStorage = () => {
    return React.useContext(StorageContext)
}


export const StorageProvider = (props) => {
    const [storage, setStorage] = React.useState([])

    React.useEffect(() => {
        Axios.get(`${target}/storages`)
            .then(res=>setStorage(res.data))
            .catch(err=>console.log(err))
    }, [])

    return (
        <StorageContext.Provider value={{ storage }}>
            {props.children}
        </StorageContext.Provider>
    )
}