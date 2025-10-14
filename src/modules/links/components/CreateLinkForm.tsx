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
import api from "@/lib/axios";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  visibility: z.enum(['public', 'request', 'private']).default('public'),
  approvalMode: z.enum(['manual', 'auto', 'domain']).default('manual'),
  approvedDomain: z.string().optional(),
}).refine(data => {
  if (data.approvalMode === 'domain') {
    return !!data.approvedDomain && data.approvedDomain.length > 0;
  }
  return true;
}, {
  message: "Approved domain is required when domain approval mode is selected",
  path: ["approvedDomain"],
});

export function CreateLinkForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      visibility: "request",
      approvalMode: "manual",
      approvedDomain: "",
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
          name="url"
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
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Visibility</FormLabel>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...field}
                disabled={mutation.isPending}
              >
                <option value="public">Public (Anyone can access)</option>
                <option value="request">Request (Users must request access)</option>
                <option value="private">Private (Only you can access)</option>
              </select>
              <FormDescription>
                Control who can access your link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {form.watch('visibility') === 'request' && (
          <FormField
            control={form.control}
            name="approvalMode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Approval Mode</FormLabel>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  disabled={mutation.isPending}
                >
                  <option value="manual">Manual (You approve each request)</option>
                  <option value="auto">Auto (All requests are automatically approved)</option>
                  <option value="domain">Domain (Approve based on email domain)</option>
                </select>
                <FormDescription>
                  How access requests should be handled.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {form.watch('visibility') === 'request' && form.watch('approvalMode') === 'domain' && (
          <FormField
            control={form.control}
            name="approvedDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approved Domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example.com"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormDescription>
                  Users with email addresses from this domain will be automatically approved.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Link"}
        </Button>
      </form>
    </Form>
  );
}
