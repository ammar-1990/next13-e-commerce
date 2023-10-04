import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './mainNav'
import StoreSwitcher from './store-switcher'
import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'

type Props = {}

const Navbar = async (props: Props) => {
    const {userId} = auth()
    if(!userId) return  redirect('/sign-in')

const stores = await db.store.findMany({
    where:{
userId 
    }
})

  return (
    <div className='border-b'>
        <div className='h-16 flex items-center px-4'>
            <StoreSwitcher items={stores}/>
           <MainNav className='mx-6' />
            <div className='flex ml-auto items-center gap-x-4'>
                <UserButton afterSignOutUrl='/' />
            </div>

        </div>
    </div>
  )
}

export default Navbar