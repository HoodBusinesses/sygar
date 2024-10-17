// renderer/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the sign-in page when the app starts
    router.push("/signin");
  }, [router]);

  return null; // Render nothing, just redirect
}
