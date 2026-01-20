import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[];
    result: CryptoPrice
    loading: boolean
    fetchCrypto: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice, //"AS" nos evita reescribir las propiedades como string vacios
    loading: false,

    fetchCrypto: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },


    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))

        const result = await fetchCurrentCryptoPrice(pair)
         
        set(() => ({
            result, //Almacenar el resultado de la consulta en el state
            loading: false
        }))
    }
})))