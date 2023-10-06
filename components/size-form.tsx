"use client";

import { Trash } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Billboard, Size } from "@prisma/client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import AlertModal from "./modals/alert-modal";


import ImageUpload from "./image-upload";

type Props = {
    initialData:Size | null
};


const formSchema = z.object({
    name: z.string().min(1,{message:'Enter valid name'}),
    value:z.string().min(1,{message:'value is required'})
  })


const SizeForm = ({initialData}: Props) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)




    const title = initialData ? 'Edit size' : 'Create size'
    const description = initialData ? 'Edit a size' : 'Add a new size'
    const toastMessage = initialData ? 'Size edited' : 'Size added'
    const action = initialData ?'Save changes' : 'Create'


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {name:'',value:''}
      })

      const router = useRouter()
      const params = useParams()

    async function onSubmit(values: z.infer<typeof formSchema>) {
  
        try {
            if(initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${initialData.id}`,values)
            }else{
                await axios.post(`/api/${params.storeId}/sizes`,values)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            
        }
      }

      const isLoading = form.formState.isSubmitting
const nameError = form.getFieldState('name').error
const valueError = form.getFieldState('value').error

const onDelete = async()=>{
  try {
    setLoading(true)
    await axios.delete(`/api/${params.storeId}/sizes/${initialData?.id}`)
    toast.success('Deleted successfully')
    router.refresh()
    router.push(`/${params.storeId}/sizes`)
  } catch (error) {
    console.log(error)
    toast.error("Make sure to delete all size's  products")
    
  }finally{
setLoading(false)
setOpen(false)
  }
}

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <div className="flex items-center justify-between">
      <Heading title={title} description={description} />

    {initialData &&  <Button  variant={"destructive"} size={"icon"} onClick={() => {setOpen(true)}}>
        <Trash className="w-4 h-4" />
      </Button>}
    </div>
<Separator orientation="horizontal" className="my-5"/>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     
        <div className="grid grid-cols-3 w-full gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                autoComplete="off"
                className={cn("outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",nameError && 'border-rose-500')}
                disabled={isLoading}
                placeholder="Size name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input 
                autoComplete="off"
                className={cn("outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",valueError && 'border-rose-500')}
                disabled={isLoading}
                placeholder="Size value" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
       
        <Button disabled={isLoading} type="submit">{action}</Button>
      </form>
    </Form>
 


    </>
  );
};

export default SizeForm;
