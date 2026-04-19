"use client";
import { Button } from "@/components/ui/button";
import { Image, Plus, X } from "lucide-react";
import { Cart } from "./Cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  foodPrice: z.coerce.number().positive("Price must be greater than 0"),
  dishCata: z.string().optional(),
  ingre: z.string().min(1, "Ingredients are required"),
  image: z.string().min(1, "Food image is required"),
});
export type foodInfo = {
  foodName: string;
  price: number;
  foodId: string;
  overview: string;
  img: string;
};
export type foodArr = {
  name: string | null;
  state: boolean;
  id: string | null;
  food: foodInfo[];
};
export type propsType = {
  ell: foodInfo;
  mapData: foodArr[];
  ele: foodArr;
};
export type dataTypeMap = {
  mapData: foodArr[];
  setAllstate: Dispatch<SetStateAction<boolean>>;
  allState: boolean;
  onFoodsChange: () => Promise<void>;
};

export const CataAdd = ({
  mapData,
  setAllstate,
  allState,
  onFoodsChange,
}: dataTypeMap) => {
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const normalizeCategoryId = (categoryId?: string | null) => {
    if (!categoryId || categoryId === "uncategorized") return null;
    return categoryId;
  };

  const removeImg = () => {
    setPreview("");
    form.setValue("image", "");
  };

  const form = useForm<
    z.input<typeof formSchema>,
    unknown,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      foodPrice: 0,
      dishCata: undefined,
      ingre: "",
      image: "",
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/foods/create", {
        name: values.foodName,
        price: values.foodPrice,
        ingredients: values.ingre,
        image: values.image,
        categoryId: normalizeCategoryId(values.dishCata),
      });
      await onFoodsChange();
      form.reset({
        foodName: "",
        foodPrice: 0,
        dishCata: undefined,
        ingre: "",
        image: "",
      });
      setPreview("");
      toast("New Food is being added to the menu!", {
        position: "top-center",
      });
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : "Failed to add food";
      toast.error(message, {
        position: "top-center",
      });
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {mapData.map((ele) => {
        if (ele.state != false && !allState)
          return (
            <div
              key={ele.id}
              className="w-full flex flex-col gap-4 bg-white p-5"
            >
              <h1 className="text-[20px] font-semibold">
                {ele.name}({ele.food.length})
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                <div className="h-60.25 w-[19%] border border-[#EF4444] border-dashed flex items-center justify-center gap-6 flex-col rounded-xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" className="rounded-full bg-red-500">
                        {" "}
                        <Plus />
                      </Button>
                    </DialogTrigger>
                    <p>Add new Dish to {ele.name}</p>
                    <DialogContent showCloseButton={false} className="w-115">
                      <DialogTitle hidden></DialogTitle>
                      <DialogHeader className="font-semibold text-[18px]">
                        Add new Dish to Appetizers
                      </DialogHeader>
                      <DialogClose asChild>
                        <Button
                          size="icon"
                          type="button"
                          variant={"outline"}
                          className="absolute rounded-full right-4 top-4"
                        >
                          <X />
                        </Button>
                      </DialogClose>
                      <div>
                        {" "}
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <div className="w-full flex justify-between">
                              {" "}
                              <FormField
                                control={form.control}
                                name="foodName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Type food name"
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="foodPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food price</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="Enter price..."
                                        value={
                                          typeof field.value === "number"
                                            ? field.value
                                            : ""
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
                            </div>
                            <FormField
                              control={form.control}
                              name="dishCata"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col justify-between">
                                  <FormLabel>Dish category</FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue {...field} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mapData.map((ele) => {
                                          return (
                                            <SelectItem
                                              key={ele.id}
                                              value={`${ele.id}`}
                                            >
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
                                <FormItem>
                                  <FormLabel>Ingredients</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="List ingredients..."
                                      className="h-22.5"
                                      {...field}
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
                                <FormItem>
                                  <FormLabel>Food image</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      value={undefined}
                                      onChange={handleUpload}
                                      className="h-22.5 z-1 opacity-0"
                                    />
                                  </FormControl>
                                  <FormMessage />

                                  <div className="mt-2 absolute w-[90%] rounded-md h-22.5 bottom-23 flex flex-col justify-center gap-2 items-center bg-[#d5dff5] border border-dashed border-[#2563EB] ">
                                    {preview ? (
                                      <>
                                        <img
                                          src={preview}
                                          alt="Preview"
                                          className="w-full h-22.5 object-cover rounded-md"
                                        />
                                        <Button
                                          size="icon"
                                          type="button"
                                          variant="outline"
                                          className="rounded-full absolute right-2 top-2 z-2"
                                          onClick={() => removeImg()}
                                        >
                                          <X />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                                          <Image className="h-4 w-4" />
                                        </div>
                                        {uploading ? (
                                          <p>Uploading</p>
                                        ) : (
                                          <p>
                                            Choose a file or drag & drop it here
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </FormItem>
                              )}
                            />
                            <div className="flex w-full justify-end">
                              <Button type="submit">Submit</Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {ele.food.map((ell) => {
                  return (
                    <div key={ell.foodId + ele.id} className="h-60.25 w-[19%]">
                      <Cart
                        ell={ell}
                        mapData={mapData}
                        ele={ele}
                        onFoodsChange={onFoodsChange}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        if (allState && ele.food.length != 0)
          return (
            <div
              key={ele.id}
              className="w-full flex flex-col gap-4 bg-white p-5"
            >
              <h1 className="text-[20px] font-semibold">
                {ele.name}({ele.food.length})
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                <div className="h-60.25 w-[19%] border border-[#EF4444] border-dashed flex items-center justify-center gap-6 flex-col rounded-xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" className="rounded-full bg-red-500">
                        {" "}
                        <Plus />
                      </Button>
                    </DialogTrigger>
                    <p>Add new Dish to {ele.name}</p>
                    <DialogContent showCloseButton={false} className="w-115">
                      <DialogTitle hidden></DialogTitle>
                      <DialogHeader className="font-semibold text-[18px]">
                        Add new Dish to Appetizers
                      </DialogHeader>
                      <DialogClose asChild>
                        <Button
                          size="icon"
                          type="button"
                          variant={"outline"}
                          className="absolute rounded-full right-4 top-4"
                        >
                          <X />
                        </Button>
                      </DialogClose>
                      <div>
                        {" "}
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <div className="w-full flex justify-between">
                              {" "}
                              <FormField
                                control={form.control}
                                name="foodName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Type food name"
                                        {...field}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="foodPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Food price</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="Enter price..."
                                        value={
                                          typeof field.value === "number"
                                            ? field.value
                                            : ""
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
                            </div>
                            <FormField
                              control={form.control}
                              name="dishCata"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col justify-between">
                                  <FormLabel>Dish category</FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue {...field} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mapData.map((ele) => {
                                          return (
                                            <SelectItem
                                              key={ele.id}
                                              value={`${ele.id}`}
                                            >
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
                                <FormItem>
                                  <FormLabel>Ingredients</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="List ingredients..."
                                      className="h-22.5"
                                      {...field}
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
                                <FormItem>
                                  <FormLabel>Food image</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      value={undefined}
                                      onChange={handleUpload}
                                      className="h-22.5 z-1 opacity-0"
                                    />
                                  </FormControl>
                                  <FormMessage />

                                  <div className="mt-2 absolute w-[90%] rounded-md h-22.5 bottom-23 flex flex-col justify-center gap-2 items-center bg-[#d5dff5] border border-dashed border-[#2563EB] ">
                                    {preview ? (
                                      <>
                                        <img
                                          src={preview}
                                          alt="Preview"
                                          className="w-full h-22.5 object-cover rounded-md"
                                        />
                                        <Button
                                          size="icon"
                                          type="button"
                                          variant="outline"
                                          className="rounded-full absolute right-2 top-2 z-2"
                                          onClick={() => removeImg()}
                                        >
                                          <X />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                                          <Image className="h-4 w-4" />
                                        </div>
                                        {uploading ? (
                                          <p>Uploading</p>
                                        ) : (
                                          <p>
                                            Choose a file or drag & drop it here
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </FormItem>
                              )}
                            />
                            <div className="flex w-full justify-end">
                              <Button type="submit">Submit</Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {ele.food.map((ell) => {
                  return (
                    <div key={ell.foodId + ele.id} className="h-60.25 w-[19%]">
                      <Cart
                        ell={ell}
                        mapData={mapData}
                        ele={ele}
                        onFoodsChange={onFoodsChange}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
      })}
    </div>
  );
};
