"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Image, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { propsType } from "./CataAdd";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  dishName: z.string().min(1, "Dish name is required"),
  dishCata: z.string().nullable().optional(),
  ingre: z.string().min(1, "Ingredients are required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  image: z.string().nullable().optional(),
});

type CartProps = propsType & {
  onFoodsChange: () => Promise<void>;
};

export const Cart = ({ ell, mapData, ele, onFoodsChange }: CartProps) => {
  const [preview, setPreview] = useState<string | null>(ell.img);
  const [uploading, setUploading] = useState<boolean>(false);
  const normalizeCategoryId = (categoryId?: string | null) => {
    if (!categoryId || categoryId === "uncategorized") return null;
    return categoryId;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.details || error.error}`);
        return;
      }

      const blob = await response.json();
      setPreview(blob.url);
      form.setValue("image", blob.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again");
    } finally {
      setUploading(false);
    }
  };
  const handleRemove = () => {
    setPreview(null);
  };
  const form = useForm<
    z.input<typeof formSchema>,
    unknown,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: ell.foodName,
      dishCata: ele.id,
      ingre: ell.overview,
      price: ell.price,
      image: ell.img,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.put(`/foods/${ell.foodId}`, {
        name: values.dishName,
        price: values.price,
        ingredients: values.ingre,
        image: values.image ?? "",
        categoryId: normalizeCategoryId(values.dishCata),
      });
      await onFoodsChange();
      toast("Food is being updated to the backend!", {
        position: "top-center",
      });
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : "Failed to update food";
      toast.error(message, { position: "top-center" });
    }
  }
  return (
    <div className="relative ">
      <Dialog>
        <Card className="p-4 w-full h-60.25 gap-1.25">
          <CardHeader className="p-0">
            <img className="w-full h-32.25 rounded-xl" src={ell.img} />
          </CardHeader>
          <CardFooter className="p-0 flex-col">
            <p className="text-[#EF4444] text-[14px] font-semibold w-full flex justify-between">
              {ell.foodName}{" "}
              <span className="text-black text-[12px]">${ell.price}</span>
            </p>
            <p className="text-[12px] text-start">{ell.overview}</p>
          </CardFooter>
        </Card>

        <DialogContent className="min-w-118" showCloseButton={false}>
          <DialogTitle className="hidden" />
          <DialogHeader className="flex-col gap-3  ">
            <div className="w-full flex justify-between">
              <h1>Dishes info</h1>
              <DialogClose asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  {" "}
                  {" "}
                  <X className="text-black" />
                </Button>
              </DialogClose>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="dishName"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-between">
                      <FormLabel> Dish name</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="w-[60%]"
                          defaultValue={ell.foodName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dishCata"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-between">
                      <FormLabel>Dish category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? "uncategorized"}
                          onValueChange={field.onChange}
                          defaultValue={`${ele.id}`}
                        >
                          <SelectTrigger className="w-[60%]">
                            <SelectValue {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            {mapData.map((ele) => {
                              return (
                                <SelectItem key={ele.id} value={`${ele.id}`}>
                                  <p className="rounded-full bg-[#F4F4F5] text-[12px] px-2.5 py-0.5 min-w-29 text-start">
                                    {ele.name}
                                  </p>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingre"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-between items-start">
                      <FormLabel> Ingredients</FormLabel>
                      <FormControl>
                        <Textarea className="w-[60%] h-20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-between">
                      <FormLabel> Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="w-[60%]"
                          value={
                            typeof field.value === "number" ? field.value : ""
                          }
                          onChange={(event) =>
                            field.onChange(event.target.valueAsNumber)
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-between">
                      <FormLabel> Image</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[60%] h-29 opacity-0 "
                          type="file"
                          accept="image/*"
                          onChange={handleUpload}
                          placeholder="Please choose photo"
                        />
                      </FormControl>

                      {preview ? (
                        <div className="absolute w-[55%] h-29 right-5">
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-cover rounded-md "
                          />
                          <Button
                            size="icon"
                            type="button"
                            variant={"outline"}
                            onClick={() => {
                              handleRemove();
                              field.onChange(null);
                            }}
                            className="absolute top-1 right-2 rounded-full "
                          >
                            <X />
                          </Button>
                        </div>
                      ) : (
                        <div className="absolute bg-white flex flex-col items-center justify-center right-6 w-69.25 h-29 border border-grey-300 rounded-xl -z-1">
                          {" "}
                          <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                            <Image className="h-4 w-4" />
                          </div>
                          {uploading ? (
                            <p>Uploading</p>
                          ) : (
                            <p>Choose a file or drag & drop it here</p>
                          )}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-between h-16 items-end">
                  <DialogClose asChild>
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"outline"}
                      className="border-red-500"
                      onClick={async () => {
                        try {
                          await api.delete("/foods", {
                            data: { id: ell.foodId },
                          });
                          await onFoodsChange();
                          toast("Food deleted successfully", {
                            position: "top-center",
                          });
                        } catch (error) {
                          const message =
                            axios.isAxiosError<{ message?: string }>(error) &&
                            error.response?.data?.message
                              ? error.response.data.message
                              : "Failed to delete food";
                          toast.error(message, {
                            position: "top-center",
                          });
                        }
                      }}
                    >
                      {" "}
                      <Trash className="text-red-500" />
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>

        <DialogTrigger asChild>
          <Button
            size="icon"
            variant={"outline"}
            className={`rounded-full absolute w-11 h-11 bottom-27 right-8 bg-white`}
          >
            <Pen className="text-red-500" />
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};
