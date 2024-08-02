import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ComboboxProps {
  options?: Array<{ value: string; label: string }>;
  emptyCommand?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Combobox({
  options = [],
  emptyCommand,
  value,
  setValue,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  //TODO: Virtualize Combobox

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[64px] w-[192px] justify-between"
        >
          <span className="flex-1 truncate text-start text-xl font-normal">
            {value ? options?.find((coin) => coin.value === value)?.label : ""}
          </span>

          <div className="mx-1 h-16 w-px bg-gray-300"></div>

          <ChevronDown className="ml-2 h-6 w-6 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput value={query} onValueChange={setQuery} />
          <CommandEmpty>{emptyCommand}</CommandEmpty>
          <CommandGroup>
            <ScrollArea>
              <CommandList >
                {options.slice(0,500).map((option) => (
                  <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                      />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandList>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
