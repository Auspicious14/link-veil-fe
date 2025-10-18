import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@/helper";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; // or a loading spinner
}
