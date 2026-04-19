"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Jumper } from "./Jumper";

export type StepContextType = {
  setStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<
    SetStateAction<{
      email: string;
    }>
  >;
  data: { email: string };
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);

const formSchema = z.object({
  Email: z
    .string()
    .email({ message: "Invalid email. Use a format like example@email.com." }),
});
export const CreateAcc = () => {
  const { setStep, setData } = useContext(StepContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setStep(2);
    setData((prev) => ({
      ...prev,
      email: values.Email,
    }));
  }
  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        disabled
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Create your account"}
        pT={"Sign up to explore your favorite dishes."}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Let&apos;s Go
          </Button>
          <Jumper value={"sign"} />
        </form>
      </Form>
    </div>
  );
};
