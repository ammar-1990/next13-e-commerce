import BillboardClient from '@/components/billboard-client'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<BillboardClient />
        </div>
    </div>
  )
}

export default page