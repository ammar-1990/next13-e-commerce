"use client";

import { Trash } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Billboard } from "@prisma/client";
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
    initialData:Billboard | null
};


const formSchema = z.object({
    label: z.string().min(1,{message:'Enter valid label'}),
    imageUrl:z.string().min(1,{message:'Image is required'})
  })


const BillboardForm = ({initialData}: Props) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)




    const title = initialData ? 'Edit bullboard' : 'Create billboard'
    const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard edited' : 'Billboard added'
    const action = initialData ?'Save changes' : 'Create'


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {label:'',imageUrl:''}
      })

      const router = useRouter()
      const params = useParams()

    async function onSubmit(values: z.infer<typeof formSchema>) {
  
        try {
            if(initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${initialData.id}`,values)
            }else{
                await axios.post(`/api/${params.storeId}/billboards`,values)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            
        }
      }

      const isLoading = form.formState.isSubmitting
const nameError = form.getFieldState('label').error

const onDelete = async()=>{
  try {
    setLoading(true)
    await axios.delete(`/api/${params.storeId}/billboards/${initialData?.id}`)
    toast.success('Deleted successfully')
    router.refresh()
    router.push(`/${params.storeId}/billboards`)
  } catch (error) {
    console.log(error)
    toast.error("Make sure to delete all billboard's  categories")
    
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
      <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background image</FormLabel>
              <FormControl>
               <ImageUpload
               value={field.value ? [field.value] : []}
               disabled={loading}
               onChange={(url)=>field.onChange(url)}
               onRemove={()=>field.onChange('')}
               />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 w-full">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input 
                autoComplete="off"
                className={cn("outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",nameError && 'border-rose-500')}
                disabled={isLoading}
                placeholder="Billboard label" {...field} />
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

export default BillboardForm;
