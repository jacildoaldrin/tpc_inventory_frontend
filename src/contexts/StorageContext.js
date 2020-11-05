import target from 'api/api.target';
import Axios from 'axios';
import React from 'react'

const StorageContext = React.createContext();

export const useStorage = () => {
    return React.useContext(StorageContext)
}

export const StorageProvider = (props) => {
    const [storage, setStorage] = React.useState([])

    const getStorage = async(id) => {
        let data = null;
        try{
            let res = Axios.get(`${target}/storages/${id}`, {headers: {
                authorization: "Bearer " + localStorage.getItem("@token"),
              }});
            data = res.data;
        }catch(err){
            console.log(err)
        }
        return data;
    }

    const getStorages = () => {
        Axios.get(`${target}/storages`, {headers: {
            authorization: "Bearer " + localStorage.getItem("@token"),
          }})
            .then(res=>setStorage(res.data))
            .catch(err=>console.log(err))
    }

    const getProductsInStorage = async(id) => {
        let data = null;
        try{
            let res = await Axios.get(`${target}/storages/productsInStorage/${id}`, {headers: {
                authorization: "Bearer " + localStorage.getItem("@token"),
              }});
            data = res.data;
        }catch(err){
            console.log(err)
        }
        return data;
    }    
    
    React.useEffect(() => {
        getStorages()
    }, [])

    return (
        <StorageContext.Provider value={{ storage, getStorage, getStorages, getProductsInStorage }}>
            {props.children}
        </StorageContext.Provider>
    )
}