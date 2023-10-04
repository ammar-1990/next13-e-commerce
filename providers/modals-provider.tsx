'use client'

import StoreModal from '@/components/modals/store-modal'
import React, { useEffect, useState } from 'react'

type Props = {}

const ModalsProvider = (props: Props) => {

const [mounted, setMounted] = useState(false)

useEffect(()=>{
    setMounted(true)
},[])

if(!mounted) return null

  return (
    <>
    <StoreModal />
    </>
  )
}

export default ModalsProvider