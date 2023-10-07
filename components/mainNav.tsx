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
        href:`/${storeId}/billboards`,
        label:'Billboards',
        active: pathname === `/${storeId}/billboards`
    },
    {
        href:`/${storeId}/categories`,
        label:'Categories',
        active: pathname === `/${storeId}/categories`
    },
    {
        href:`/${storeId}/sizes`,
        label:'Sizes',
        active: pathname === `/${storeId}/sizes`
    },
    {
        href:`/${storeId}/colors`,
        label:'Colors',
        active: pathname === `/${storeId}/colors`
    },
    {
        href:`/${storeId}/products`,
        label:'Products',
        active: pathname === `/${storeId}/products`
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