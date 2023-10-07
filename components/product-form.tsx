"use client";

import { Trash } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {  Category, Color, Image, Product, Size } from "@prisma/client";
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

    FormDescription,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import AlertModal from "./modals/alert-modal";


import ImageUpload from "./image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

type Props = {
    initialData:Product & {images : Image[]} | null,
    sizes:Size[],
    categories:Category[],
    colors:Color[]
};


const formSchema = z.object({
    name: z.string().min(1,{message:'Enter valid name'}),
    images:z.object({url:z.string()}).array().min(1),
    price:z.coerce.number().min(1),
    isFeatured:z.boolean().default(false).optional(),
    isArchived:z.boolean().default(false).optional(),
    sizeId:z.string().min(1),
    colorId:z.string().min(1),
    categoryId:z.string().min(1)
  })


const ProductForm = ({initialData,sizes,categories,colors}: Props) => {

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
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-3 ">
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
                placeholder="Name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                type="number"
                autoComplete="off"
                className={cn("outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",priceError && 'border-rose-500')}
                disabled={isLoading}
                placeholder="9.99$" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />

<FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          ` outline-none  
                  focus-within:ring-0 
                  focus-within:ring-offset-0 focus-visible:ring-1 
                  focus-visible:ring-offset-1 focus:ring-1
                   focus:ring-offset-1`,
                        sizeError && "border-rose-500"
                        )}
                      >
                        <SelectValue
                          placeholder="Select a size"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={size.id}
                          value={size.id}
                        >
                          <div className="flex items-center  justify-between w-40 md:w-60 ">
                          {size.name} <span>{size.value}</span> 
                          </div>
                         
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          ` outline-none  
                  focus-within:ring-0 
                  focus-within:ring-offset-0 focus-visible:ring-1 
                  focus-visible:ring-offset-1 focus:ring-1
                   focus:ring-offset-1`,
                        colorError && "border-rose-500"
                        )}
                      >
                        <SelectValue
                          placeholder="Select a color"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem
                          className="cursor-pointer w-full"
                          key={color.id}
                          value={color.id}
                        >
                          <div className="flex items-center justify-between w-40 md:w-60">
                          {color.name} <div className="p-2 rounded-full " style={{backgroundColor:color.value}}></div>
                          </div>
                          
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          ` outline-none  
                  focus-within:ring-0 
                  focus-within:ring-offset-0 focus-visible:ring-1 
                  focus-visible:ring-offset-1 focus:ring-1
                   focus:ring-offset-1`,
                        categoryError && "border-rose-500"
                        )}
                      >
                        <SelectValue
                          placeholder="Select a category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row  space-x-3 space-y-0 rounded-md border p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none ">
              <FormLabel>Featured</FormLabel>
                <FormDescription>
                  This product will appear on the homepage.
             
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="isArchived"
          render={({ field }) => (
            <FormItem className="flex flex-row  space-x-3 space-y-0 rounded-md border p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
              <FormLabel>Archived</FormLabel>
                <FormDescription>
                  This product will not appear anywhere in the store.
             
                </FormDescription>
              </div>
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
