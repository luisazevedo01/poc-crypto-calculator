import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CryptoCalculator from "@/components/custom/crypto-calculator";
import Ticker from "@/components/custom/ticker";
import useCryptoCalculator from "./hooks/use-crypto-calculator";
import HttpRequest from "@/helpers/http-request";
import { useCallback, useEffect } from "react";
import useTicker from "./hooks/use-ticker";

export default function App() {
  const {
    calculatorAmount,
    convertHistory,
    fromCurrency,
    toCurrency,
    calculatorCoins,
    calculateConversion,
    setFromCurrency,
    setToCurrency,
    setFetchedCoins,
    setSupportedCoins,
    setCalculatorCoins,
    setCalculatorAmount,
  } = useCryptoCalculator();

  const { tickerCoins, setTickerCoins } = useTicker();

  const fetchCoins = useCallback(async () => {
    const coinsResponse: any = await HttpRequest.GET("/coins/list");
    setFetchedCoins(coinsResponse);

    const supportedCurrenciesResponse: any = await HttpRequest.GET(
      "/simple/supported_vs_currencies"
    );
    setSupportedCoins(supportedCurrenciesResponse);

    const filteredCalculatorCoins = coinsResponse
      .filter((coin: any) => supportedCurrenciesResponse.includes(coin.symbol))
      .map((coin: any) => ({
        value: coin.id,
        label: coin.name,
      }));

    setCalculatorCoins(filteredCalculatorCoins);

    const tickerFormattedCoins = coinsResponse.map((coin: any) => ({
      value: coin.id,
      label: coin.name,
    }));

    setTickerCoins(tickerFormattedCoins);
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <Tabs defaultValue="calculator" className="">
        <TabsList className="center w-screen">
          <TabsTrigger value="calculator">CRYPTO CALCULATOR</TabsTrigger>
          <TabsTrigger value="ticker">TICKER</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator" className="w-full">
          <CryptoCalculator
            amount={calculatorAmount}
            convertHistory={convertHistory}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            coins={calculatorCoins}
            setAmount={setCalculatorAmount}
            setFromCurrency={setFromCurrency}
            setToCurrency={setToCurrency}
            calculateConversion={calculateConversion}
          />
        </TabsContent>
        <TabsContent value="ticker">
          <Ticker coins={tickerCoins} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
