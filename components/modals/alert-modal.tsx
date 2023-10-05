'use client'

import React, { useEffect, useState } from 'react'
import Modal from '../modal'
import { Button } from '../ui/button'

type Props = {
    isOpen:boolean,
onClose:()=>void,
onConfirm:()=>void,
loading:boolean
}

const AlertModal = ({isOpen,onClose,onConfirm,loading}: Props) => {
    const [mounted, setMounted] = useState(false)


    useEffect(()=>{

        setMounted(true)
    },[])

if(!mounted) return null


  return (

   
    <Modal
    title='Are you sure ?'
    description='This action will not be reverted!'
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className='p-1 w-full flex justify-end gap-x-3'>
            <Button disabled={loading} variant={'outline'} onClick={onClose}>Cancel</Button>
            <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>Delete</Button>

        </div>


        </Modal>
  )
}

export default AlertModal