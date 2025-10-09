"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  destinationUrl: z.string().url({ message: "Please enter a valid URL." }),
  description: z.string().optional(),
  requireApproval: z.boolean(),
});

export function CreateLinkForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      destinationUrl: "",
      description: "",
      requireApproval: true,
    },
  });

  const mutation = useMutation({
    mutationFn: (newLink: z.infer<typeof formSchema>) => {
      return api.post("/links", newLink);
    },
    onSuccess: () => {
      toast.success("Link created successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to create link", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., My Awesome Portfolio"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormDescription>
                A short, descriptive title for your link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destinationUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormDescription>
                The original URL where users will be redirected.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="A brief description of the link's content."
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requireApproval"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Require Approval</FormLabel>
                <FormDescription>
                  If enabled, you must approve users before they can access the
                  link.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={mutation.isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Link"}
        </Button>
      </form>
    </Form>
  );
}
