"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { pb } from "@/lib/pocketbase";

export default function ConfirmVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("No token found.");
      router.push("/signup");
      return;
    }

    const verify = async () => {
      try {
        await pb.collection("users").confirmVerification(token);
        toast.success("Account verified successfully!");
        router.push("/login");
      } catch (err) {
        console.error(err);
        toast.error("Verification failed or token expired.");
        router.push("/signup");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Confirm Verification
      </h2>
    </div>
  );
}
