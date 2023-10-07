"use client";

import { Trash } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Billboard, Category, Color, Image, Product, Size } from "@prisma/client";
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
    initialData:Product & {images : Image[]} | null,
    sizes:Size[],
    categories:Category[],
    colors:Color[]
};


const formSchema = z.object({
    name: z.string().min(1,{message:'Enter valid name'}),
    images:z.object({url:z.string()}).array(),
    price:z.coerce.number().min(1),
    isFeatured:z.boolean().default(false).optional(),
    isArchived:z.boolean().default(false).optional(),
    sizeId:z.string().min(1),
    colorId:z.string().min(1),
    categoryId:z.string().min(1)
  })


const ProductForm = ({initialData}: Props) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)




    const title = initialData ? 'Edit product' : 'Create product'
    const description = initialData ? 'Edit a product' : 'Add a new product'
    const toastMessage = initialData ? 'Product edited' : 'Product added'
    const action = initialData ?'Save changes' : 'Create'


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {...initialData, price:parseFloat(String(initialData?.price))} : {
          name:'',
          images:[],
          price:0,
          isArchived:false,
          isFeatured:false,
          sizeId:'',
          categoryId:'',
          colorId:''
        }
      })

      const router = useRouter()
      const params = useParams()

    async function onSubmit(values: z.infer<typeof formSchema>) {
  
        try {
            if(initialData) {
                await axios.patch(`/api/${params.storeId}/products/${initialData.id}`,values)
            }else{
                await axios.post(`/api/${params.storeId}/products`,values)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success(toastMessage)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            
        }
      }

      const isLoading = form.formState.isSubmitting
const nameError = form.getFieldState('name').error
const priceError = form.getFieldState('price').error
const sizeError = form.getFieldState('sizeId').error
const colorError = form.getFieldState('colorId').error
const categoryError = form.getFieldState('categoryId').error
const imageError = form.getFieldState('images').error

const onDelete = async()=>{
  try {
    setLoading(true)
    await axios.delete(`/api/${params.storeId}/products/${initialData?.id}`)
    toast.success('Deleted successfully')
    router.refresh()
    router.push(`/${params.storeId}/products`)
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
    
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
               <ImageUpload
               value={field.value.map((img)=>img.url)}
               disabled={loading}
               onChange={(url)=>field.onChange([...field.value,{url}])}
               onRemove={(url)=>field.onChange([...field.value.filter(img=>img.url !== url)])}
               />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 w-full gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input 
                autoComplete="off"
                className={cn("outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",nameError && 'border-rose-500')}
                disabled={isLoading}
                placeholder="Name" {...field} />
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

export default ProductForm;
