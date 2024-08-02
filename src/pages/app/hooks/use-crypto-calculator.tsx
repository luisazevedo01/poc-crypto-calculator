import HttpRequest from "@/helpers/http-request";
import { useState } from "react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

interface UseCryptoController {
  calculatorAmount: string;
  convertHistory: Array<string[]>;
  fromCurrency: string;
  toCurrency: string;
  calculatorCoins: any[];
  calculateConversion: () => void;
  setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
  setToCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFetchedCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
  setSupportedCoins: React.Dispatch<React.SetStateAction<string[]>>;
  setCalculatorCoins: React.Dispatch<React.SetStateAction<any[]>>;
  setCalculatorAmount: React.Dispatch<React.SetStateAction<string>>;
}

const useCryptoCalculator = (): UseCryptoController => {
  const [convertHistory, setConvertHistory] = useState<Array<string[]>>([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [calculatorAmount, setCalculatorAmount] = useState("");

  const [fetchedCoins, setFetchedCoins] = useState<Coin[]>([]);
  const [supportedCoins, setSupportedCoins] = useState<string[]>([]);

  const [calculatorCoins, setCalculatorCoins] = useState<any[]>([]);

  const calculateConversion = async () => {
    const symbol = fetchedCoins.find((el) => el.id == toCurrency)?.symbol;
    const target = supportedCoins.find((coin) => coin == symbol);

    const convertResponse: any = await HttpRequest.GET("/simple/price", {
      ids: fromCurrency,
      vs_currencies: target,
    });

    const keys = Object.keys(convertResponse);

    const firstKey = keys[0];
    const firstValue = convertResponse[firstKey];
    const nestedKeys = Object.keys(firstValue);
    const nestedKey = nestedKeys[0];

    const rate = firstValue[nestedKey];

    const cryptoResponse: any = await HttpRequest.GET(`coins/${fromCurrency}`);
    const targetCryptoResponse: any = await HttpRequest.GET(
      `coins/${toCurrency}`
    );

    const message = [
      `${calculatorAmount} ${String(
        cryptoResponse.symbol
      ).toLocaleUpperCase()}`,
      `${rate * Number(calculatorAmount)} ${String(
        targetCryptoResponse.symbol
      ).toLocaleUpperCase()}`,
    ];
    setConvertHistory((prevHistory) => [message, ...prevHistory]);
  };

  return {
    calculatorAmount,
    convertHistory,
    fromCurrency,
    toCurrency,
    calculatorCoins,
    setFromCurrency,
    setToCurrency,
    calculateConversion,
    setCalculatorCoins,
    setFetchedCoins,
    setSupportedCoins,
    setCalculatorAmount
  };
};

export default useCryptoCalculator;
