import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ApiBranch from "./service"

const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]
  
export function ComboBox() {
    const [opened, setOpened] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [branchs, setBranchs] = React.useState([])


    const getBranchs = async () => {
        const response = await ApiBranch.List({ client: "Banco do Brasil" });
        setBranchs(response)
        console.log(response, "response")
    }

    React.useEffect(() => {
        getBranchs()
    }, [])
    
    return (
        <Popover open={opened} onOpenChange={setOpened}>
            <PopoverTrigger asChild>
                <Button aria-expanded={open} className="w-[200px] justify-between">
          
                    {value ? branchs.find((bra) => bra.value === value)?.label: "Select branch..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
      
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Pesquisar branch..." />
                    <CommandList>
                        <CommandEmpty>No bra found.</CommandEmpty>
                        <CommandGroup>
                        
                        {branchs.map((bra) => (
                            <CommandItem
                                key={bra.id}
                                value={bra.name}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpened(false)
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === bra.value ? "opacity-100" : "opacity-0")}/>
                                {bra.name}
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}