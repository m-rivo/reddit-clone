"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const { username, password } = Object.fromEntries(formData);

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(username as string, password as string);

      console.log("Successful login:", authData);

      Cookies.set("pb_auth", pb.authStore.exportToCookie(), {
        expires: 7, //days
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Wrong email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button disabled={loading}>
        {loading ? (
          <>
            <Spinner data-icon="inline-start" />
            Loading...
          </>
        ) : (
          "Login"
        )}
      </Button>
      <Button variant="link" asChild>
        <Link href="/signup">Signup</Link>
      </Button>
    </form>
  );
}
