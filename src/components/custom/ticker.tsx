import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "../ui/combo-box";
import HttpRequest from "@/helpers/http-request";

interface TickerProps {
  coins: Array<any>;
}

const Ticker = ({ coins }: TickerProps) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  const [exchanges, setExchanges] = useState([]);

  const [tickers, setTickers] = useState([]);

  const fetchExchanges = useCallback(async () => {
    const exchangesResponse: any = await HttpRequest.GET("/exchanges/list");
    console.log("exchanges: ", exchangesResponse);

    const formattedExchanges = exchangesResponse.map((coin: any) => ({
      value: coin.id,
      label: coin.name,
    }));
    setExchanges(formattedExchanges);
  }, []);

  const searchTicker = async () => {
    const tickerResponse: any = await HttpRequest.GET(
      `/coins/${selectedCoin}/tickers`
    );

    setTickers(tickerResponse.tickers);
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <h1 className="font-bold text-[40px] text-primary tracking-[0.8px] text-center leading-[56px] mt-[96px]">
        TICKER
      </h1>

      <section className="flex justify-center items-end gap-4 mt-[32px]">
        <div className="flex flex-col">
          <label className="block font-bold text-primary text-[13px] tracking-[0.81px] leading-[16px] mb-2">
            COIN:
          </label>
          <Combobox
            value={selectedCoin}
            setValue={setSelectedCoin}
            options={coins.sort()}
            emptyCommand="Coin not found..."
          />
        </div>

        <div className="flex flex-col">
          <label className="block font-bold text-primary text-[13px] tracking-[0.81px] leading-[16px] mb-2">
            MARKET:
          </label>
          <Combobox
            value={selectedMarket}
            setValue={setSelectedMarket}
            options={exchanges}
            emptyCommand="Coin not found..."
          />
        </div>
        <Button variant={"default"} onClick={searchTicker}>
          Search
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        {tickers.map((ticker: any) => (
          <Card className="w-[870px] h-[136px]">
            <CardContent className="h-full py-4 px-8">
              <div className="h-full flex justify-between">
                <div className="h-full flex flex-col justify-between">
                  <h2 className="text-[32px] text-card-foreground tracking-normal leading-[32px] max-w-56 overflow-scroll">
                    <strong>
                      {ticker.base}/{ticker.target}
                    </strong>
                  </h2>
                  <div className="flex flex-col gap-2">
                    <p className={cardSecondaryText}>
                      <b>Last value: </b>
                      {ticker.converted_last?.usd} <b>USD</b>
                    </p>
                    <p className={cardSecondaryText}>
                      <b>Last trade: </b>
                      {ticker.last_traded_at}
                    </p>
                  </div>
                </div>
                <div className="h-full flex flex-col justify-between">
                  <a
                    className="text-primary underline underline-offset-1 text-[13px] tracking-normal leading-[16px] text-right"
                    href={ticker.trade_url}
                  >
                    <b>View more</b>
                  </a>

                  <div className="flex flex-col justify-end gap-2">
                    <p className={`text-right ${cardSecondaryText}`}>
                      <b>Market:</b> {ticker.market?.name}
                    </p>
                    <p className={`text-right ${cardSecondaryText}`}>
                      <b>Market Volume:</b> {ticker.volume}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

const cardSecondaryText =
  "text-muted text-[13px] tracking-normal leading-[16px]";

export default Ticker;
