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
  visibility: "public" | "request" | "private";
  approvalMode: "manual" | "auto" | "domain";
  approvedDomain?: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  url: Yup.string().url("Please enter a valid URL.").required("URL is required."),
  visibility: Yup.string().oneOf(["public", "request", "private"]).default("public"),
  approvalMode: Yup.string().oneOf(["manual", "auto", "domain"]).default("manual"),
  approvedDomain: Yup.string().when(["visibility", "approvalMode"], {
    is: (visibility: string, approvalMode: string) => visibility === "request" && approvalMode === "domain",
    then: (schema) => schema.required("Approved domain is required when domain approval mode is selected"),
    otherwise: (schema) => schema.optional()
  }),
});


export function CreateLinkForm() {
  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    url: "",
    visibility: "request",
    approvalMode: "manual",
    approvedDomain: "",
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

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    mutation.mutate(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, touched, errors, handleChange, handleBlur }) => (
        <Form className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
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
            <ErrorMessage name="title" component="div" className="text-sm text-destructive" />
          </div>
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">Destination URL</label>
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
            <ErrorMessage name="url" component="div" className="text-sm text-destructive" />
          </div>
          {/* Commented out description field - can be uncommented if needed
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
            <Field
              as={Input}
              id="description"
              name="description"
              placeholder="A brief description of the link's content."
              disabled={mutation.isPending || isSubmitting}
            />
            <ErrorMessage name="description" component="div" className="text-sm text-destructive" />
          </div>
          */}
          <div className="space-y-2">
            <label htmlFor="visibility" className="text-sm font-medium">Visibility</label>
            <Field
              as="select"
              id="visibility"
              name="visibility"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={mutation.isPending || isSubmitting}
            >
              <option value="public">Public (Anyone can access)</option>
              <option value="request">Request (Users must request access)</option>
              <option value="private">Private (Only you can access)</option>
            </Field>
            <p className="text-sm text-muted-foreground">
              Control who can access your link.
            </p>
            <ErrorMessage name="visibility" component="div" className="text-sm text-destructive" />
          </div>

          {values.visibility === "request" && (
            <div className="space-y-2">
              <label htmlFor="approvalMode" className="text-sm font-medium">Approval Mode</label>
              <Field
                as="select"
                id="approvalMode"
                name="approvalMode"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={mutation.isPending || isSubmitting}
              >
                <option value="manual">Manual (You approve each request)</option>
                <option value="auto">Auto (All requests are automatically approved)</option>
                <option value="domain">Domain (Approve based on email domain)</option>
              </Field>
              <p className="text-sm text-muted-foreground">
                How access requests should be handled.
              </p>
              <ErrorMessage name="approvalMode" component="div" className="text-sm text-destructive" />
            </div>
          )}

          {values.visibility === "request" && values.approvalMode === "domain" && (
            <div className="space-y-2">
              <label htmlFor="approvedDomain" className="text-sm font-medium">Approved Domain</label>
              <Field
                as={Input}
                id="approvedDomain"
                name="approvedDomain"
                placeholder="example.com"
                disabled={mutation.isPending || isSubmitting}
              />
              <p className="text-sm text-muted-foreground">
                Users with email addresses from this domain will be automatically approved.
              </p>
              <ErrorMessage name="approvedDomain" component="div" className="text-sm text-destructive" />
            </div>
          )}
          <Button type="submit" disabled={mutation.isPending || isSubmitting}>
            {mutation.isPending || isSubmitting ? "Creating..." : "Create Link"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
