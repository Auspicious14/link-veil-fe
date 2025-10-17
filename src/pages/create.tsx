import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  url: z.string().url('Please enter a valid URL.'),
});

export default function CreateLinkPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Authentication Error', {
        description: 'You must be logged in to create a link.',
      });
      router.push('/login');
      return;
    }

    try {
      const response = await api.post('/api/links', values);

      if (response.data.success) {
        toast.success('Link Created Successfully!', {
          description: `Your gateway URL is: ${window.location.origin}${response.data.data.fullUrl}`,
        });
        router.push('/dashboard');
      } else {
        toast.error('Failed to create link', {
          description: response.data.message || 'An unknown error occurred.',
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        description:
          (error as any).response?.data?.message || 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create a New Link</h1>
          <p className="text-gray-500">
            Enter the details below to create your cloaked link.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome Portfolio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Link'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}