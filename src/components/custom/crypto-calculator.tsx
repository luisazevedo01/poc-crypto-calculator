import { MoveRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "../ui/combo-box";

interface CryptoCalculatorProps {
  amount: string;
  convertHistory: Array<string[]>;
  fromCurrency: string;
  toCurrency: string;
  coins: Array<any>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
  setToCurrency: React.Dispatch<React.SetStateAction<string>>;
  calculateConversion: () => void;
}

const CryptoCalculator = ({
  amount,
  convertHistory,
  fromCurrency,
  toCurrency,
  coins,
  setAmount,
  setFromCurrency,
  setToCurrency,
  calculateConversion,
}: CryptoCalculatorProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <h1 className="font-bold text-[40px] text-primary tracking-[0.8px] text-center leading-[56px] mt-[96px]">
        CRYPTO CALCULATOR
      </h1>

      <section className="flex justify-center items-end gap-4 mt-[32px]">
        <div className="flex flex-col">
          <label className="block font-bold text-primary text-[13px] tracking-[0.81px] leading-[16px] mb-2">
            FROM:
          </label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </div>

        <div>
          <Combobox
            value={fromCurrency}
            setValue={setFromCurrency}
            options={coins}
            emptyCommand="Coin not found..."
          />
        </div>

        <MoveRight strokeWidth="1px" className="h-[64px] w-[49px]" />
        <div className="flex flex-col">
          <label className="block font-bold text-primary text-[13px] tracking-[0.81px] leading-[16px] mb-2">
            TO:
          </label>
          <Combobox
            value={toCurrency}
            setValue={setToCurrency}
            options={coins}
            emptyCommand="Coin not found..."
          />
        </div>
        <Button onClick={calculateConversion}>Convert</Button>
      </section>
      <section className="flex flex-col gap-4">
        {convertHistory.length > 0 && (
          <h3 className=" font-bold text-[16px] text-[#21639C] tracking-[1px] text-center leading-[24px]">
            RESULT
          </h3>
        )}

        {convertHistory?.slice(0, 10).map((conversion, idx) => {
          if (idx === 0) {
            return (
              <div className="flex justify-center gap-3">
                <h2 className="text-3xl text-[#454B51] tracking-[0px] text-right">
                  <strong className={strongStyle}>{conversion[0]}</strong> is
                  worth <strong className={strongStyle}>{conversion[1]}</strong>
                </h2>
              </div>
            );
          } else {
            return (
              <div className="flex justify-center gap-3">
                <p className={historyStyle}>
                  <b className={cn("font-extrabold", historyStyle)}>
                    {conversion[0]}
                  </b>{" "}
                  is worth{" "}
                  <b className={cn("font-extrabold", historyStyle)}>
                    {conversion[1]}
                  </b>
                </p>
              </div>
            );
          }
        })}
      </section>
    </div>
  );
};

const strongStyle =
  "text-3xl font-extrabold text-[#353A3E] tracking-[0px] text-right";
const historyStyle = "text-lg text-muted";

export default CryptoCalculator;
