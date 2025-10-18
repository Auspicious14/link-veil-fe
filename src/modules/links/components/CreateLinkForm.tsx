"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

interface FormValues {
  title: string;
  url: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  url: Yup.string()
    .url("Please enter a valid URL.")
    .required("URL is required."),
});

export function CreateLinkForm() {
  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    url: "",
  };

  const mutation = useMutation({
    mutationFn: (newLink: FormValues) => {
      return api.post("/links", newLink);
    },
    onSuccess: () => {
      toast.success("Link created successfully!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error("Failed to create link", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
      }) => (
        <Form className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Field
              as={Input}
              id="title"
              name="title"
              placeholder="e.g., My Awesome Portfolio"
              disabled={mutation.isPending || isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              A short, descriptive title for your link.
            </p>
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-destructive"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Destination URL
            </label>
            <Field
              as={Input}
              id="url"
              name="url"
              placeholder="https://example.com"
              disabled={mutation.isPending || isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              The original URL where users will be redirected.
            </p>
            <ErrorMessage
              name="url"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <Button type="submit" disabled={mutation.isPending || isSubmitting}>
            {mutation.isPending || isSubmitting ? "Creating..." : "Create Link"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
