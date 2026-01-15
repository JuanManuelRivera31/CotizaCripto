import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { CryptoCurrenciesResponseSchema } from "./schema/cripto.schema";
import type { CryptoCurrency } from "./types";
import { set } from "zod";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[];
    fetchCrypto: () => Promise<void>;
}

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: { Data }} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);
    if (result.success) {
        return result.data;
    }
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCrypto: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    }
})))