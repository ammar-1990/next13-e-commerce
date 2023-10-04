'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { useStore } from '@/hooks/use-store-hook';
import { useEffect } from 'react';


export default function Home() {

  const {isOpen, onOpen} = useStore()
 


useEffect(()=>{
  if(!isOpen){
    onOpen()
  }
},[isOpen,onOpen])

 
return null

}
