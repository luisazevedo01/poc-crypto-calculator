import { useState } from "react";

interface UseTickerController {
    tickerCoins: any[];
    setTickerCoins: React.Dispatch<React.SetStateAction<any[]>>
}

const useTicker = (): UseTickerController => {
    const [tickerCoins, setTickerCoins] = useState<any[]>([]);

    return {
        tickerCoins,
        setTickerCoins
    }
}

export default useTicker;