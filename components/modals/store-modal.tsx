"use client";
import Modal from "../modal";
import { useStore } from "@/hooks/use-store-hook";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
 
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"


  import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";


type Props = {};

const formSchema = z.object({
    name: z.string().trim().min(1,{message:'Enter valid name'}),
  })


const StoreModal = (props: Props) => {
  const { isOpen, onClose } = useStore();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

const isLoading = form.formState.isSubmitting

 async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const response = await axios.post(`/api/stores`,values)
window.location.assign(`/${response.data.id}`)
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
  }

   
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Create store"
      description="Add a new store to manage products and categories"
      onClose={onClose}
    >
<div className=" py-3">
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">name</FormLabel>
              <FormControl>
                <Input
                disabled={isLoading}
                className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"  autoComplete="off" placeholder="e-commerce" {...field} />
              </FormControl>
              <FormMessage className="text-xs px-1" />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-end mt-5 space-x-2">
<Button disabled={isLoading} type="button" variant={'outline'} onClick={onClose}>Cancel</Button>
<Button disabled={isLoading} type="submit">Continue</Button>
        </div>
      </form>
    </Form>
</div>
    </Modal>
  );
};

export default StoreModal;
