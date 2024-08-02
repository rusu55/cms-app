'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
 import SimpleMDE from "react-simplemde-editor";
 import { z } from "zod";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";

 import "easymde/dist/easymde.min.css";
 import { weddingDetailsSchema } from "@/types/schemas";

 type FormValues = z.input<typeof weddingDetailsSchema>;
 type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    disabled?: boolean;
 }

const WeddingDetailsForm= ({id, onSubmit, disabled}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(weddingDetailsSchema),
        defaultValues: {}
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
        <div>
            <FormField
                name="details"
                control={form.control}
                render={({field})=> (
                    <FormItem className="w-full">
                        <FormLabel>Details:</FormLabel>
                        <FormControl>
                            <SimpleMDE placeholder="eg. Details....." {...field}/>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
        <Button className="w-full" disabled={disabled}>Save Details</Button>
      </form>
    </Form>
  )
}

export default WeddingDetailsForm