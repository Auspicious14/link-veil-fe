import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LoginForm } from "@/modules/auth/components/LoginForm";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/login", values);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful", {
          description: "Redirecting to your dashboard...",
        });
        router.push("/dashboard");
      } else {
        toast.error("Login Failed", {
          description: response.data.message || "An unknown error occurred.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description:
          (error as any).response?.data?.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <LoginForm />;
}
