"use client";

import { Store } from "@prisma/client";

import { useStore } from "@/hooks/use-store-hook";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface Props extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ items = [], className }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { onOpen } = useStore();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px]  justify-between", className)}
        >
          <StoreIcon className="h-4 w-4" />
         {currentStore?.label}
          <ChevronsUpDown className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No Store Found</CommandEmpty>

            <CommandGroup heading='Stores'>
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => { }}
                  className="text-sm flex items-center justify-between cursor-pointer"
                >
                  <StoreIcon className="w-4 h-4" />
                  {item.label}
                  <Check
                    className={cn(
                      " h-4 w-4",
                      currentStore?.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="flex items-center gap-x-4 cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <PlusCircle className="w-4 h-4" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;

