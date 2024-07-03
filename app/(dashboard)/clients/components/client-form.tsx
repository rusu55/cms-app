"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { services } from "@/utils/constants";


const formSchema = z.object({
  brideName: z.string().min(2).max(50),
  groomName: z.string().min(2).max(50),
  email: z.string().email(),
  secondaryEmail: z.string().email().optional(),
  phone: z.string().optional(),
  weddingDate: z.date(),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  packagePrice: z.string(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};
 const ClientForm = ({
  id,
  onSubmit,
  disabled,
  defaultValues,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
    },
  });

  const handleSubmit = (values: FormValues) => {
   onSubmit(values);   
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <div className="w-full flex justify-center space-x-2">
          <FormField
            name="brideName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bride Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g. Dany Boe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="groomName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Groom Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g. Dany Boe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-center space-x-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g. Dany Boe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="secondaryEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Secondary Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g. Dany Boe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-center space-x-2">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g. Dany Boe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weddingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-3 w-full">
                <FormLabel>Wedding Date: </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem className="mt-3">
              <div className="mb-4">
                <FormLabel className="text-base">Services</FormLabel>
              </div>
              {services.map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== service.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {service.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="packagePrice"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Package Price</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Dany Boe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Add New Client"}
        </Button>
      </form>
    </Form>
  );
};
export default ClientForm