'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import StoreSwitcher from "./store-switcher"
import { Store } from "@prisma/client"
import MainNav from "./mainNav"
import {Menu} from 'lucide-react'
type Props = {items :Store[]}

const MySheet = ({items}: Props) => {
  return (
<Sheet >
  <SheetTrigger className="lg:hidden"><Menu /></SheetTrigger>
  <SheetContent className="lg:hidden flex t space-y-5 flex-col">
    <StoreSwitcher items={items} />
    <MainNav className="flex-col  items-start w-full gap-6" />
 
  </SheetContent>
</Sheet>
  )
}

export default MySheet