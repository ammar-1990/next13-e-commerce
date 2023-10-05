'use client'

import { cn } from '@/lib/utils'

import {usePathname, useParams} from 'next/navigation'
import Link from 'next/link'


type Props = React.HTMLAttributes<HTMLElement>

const MainNav = ({className, ...props}: Props) => {
const pathname = usePathname()
const {storeId} = useParams()

const routes = [

    {
        href:`/${storeId}`,
        label:'Overview',
        active: pathname === `/${storeId}`
    },
    {
        href:`/${storeId}/settings`,
        label:'Settings',
        active: pathname === `/${storeId}/settings`
    },
]


  return (
    <nav className={cn('flex items-center gap-x-4 lg:gap-x-6',className)}>
        {routes.map((route)=>(
            <Link
            key={route.href}
            href={route.href}
            className={cn('text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white': 'text-muted-foreground')}
            >
                {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default MainNav