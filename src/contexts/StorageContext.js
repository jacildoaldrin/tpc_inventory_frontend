import target from 'api/api.target';
import Axios from 'axios';
import React from 'react'

const StorageContext = React.createContext();

export const useStorage = () => {
    return React.useContext(StorageContext)
}


export const StorageProvider = (props) => {
    const [storage, setStorage] = React.useState([])

    const getStorage = () => {
        Axios.get(`${target}/storages`, {headers: {
            authorization: "Bearer " + localStorage.getItem("@token")
        }})
            .then(res=>setStorage(res.data))
            .catch(err=>console.log(err))
    }

    React.useEffect(() => {
        getStorage()
    }, [])

    return (
        <StorageContext.Provider value={{ storage, getStorage }}>
            {props.children}
        </StorageContext.Provider>
    )
}