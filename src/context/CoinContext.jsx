import { createContext, useEffect, useState } from "react";

// Here all the data from API will be available to all the components in the project.
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        // Here default values are usd and $ symbol and setCurrency method will set the currency based on user input

        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-nqtCPu3f7aLD5tzKYibJYLyu' } };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }

    // useEffect will run fetchAllCoin method when the component is loaded
    useEffect(() => {
        fetchAllCoin();
    }, [currency])

    const contextValue = {
        allCoin,currency, setCurrency
    }
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider
