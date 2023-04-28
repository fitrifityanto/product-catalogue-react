import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const ContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState (false)
    const [products, setProducts] = useState ([])

    const fetchProducts = async () => {
        console.log('sedang melakukan fetch')
        try {
        setIsLoading(true)
           const response = await axios.get('https://api-project.amandemy.co.id/api/final/products',
           {
               headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
           }
           ) 
           setProducts(response.data.data)
           
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <GlobalContext.Provider value={{
            products: products,
            setProducts: setProducts,
            fetchProducts: fetchProducts,
            isLoading: isLoading,
            setIsLoading: setIsLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}