"use client";

import { Trash } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Billboard, Color, Size } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AlertModal from "./modals/alert-modal";

import ImageUpload from "./image-upload";

type Props = {
  initialData: Color | null;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter valid name" }),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "String must be a valid hex code" }),
});

const ColorForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color" : "Add a new color";
  const toastMessage = initialData ? "Color edited" : "Color added";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  const router = useRouter();
  const params = useParams();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${initialData.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, values);
      }

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const isLoading = form.formState.isSubmitting;
  const nameError = form.getFieldState("name").error;
  const valueError = form.getFieldState("value").error;

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${initialData?.id}`);
      toast.success("Deleted successfully");
      router.refresh();
      router.push(`/${params.storeId}/colors`);
    } catch (error) {
      console.log(error);
      toast.error("Make sure to delete all color's  products");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator orientation="horizontal" className="my-5" />

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
                      className={cn(
                        "outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",
                        nameError && "border-rose-500"
                      )}
                      disabled={isLoading}
                      placeholder="Color name"
                      {...field}
                    />
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
                    <div className="flex items-center gap-5">
                      <Input
                        autoComplete="off"
                        className={cn(
                          "outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ",
                          valueError && "border-rose-500"
                        )}
                        disabled={isLoading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div className="rounded-full p-4 border " style={{backgroundColor:field.value}}>

                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForm;
