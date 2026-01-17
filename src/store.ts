import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency } from "./types";
import { getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[];
    fetchCrypto: () => Promise<void>;
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