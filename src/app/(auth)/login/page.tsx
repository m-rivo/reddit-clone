"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "sonner";
import { Formik, Form } from "formik";

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Login
      </h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await pb
              .collection("users")
              .authWithPassword(values.username, values.password);
            console.log("Successful login!");

            Cookies.set("pb_auth", pb.authStore.exportToCookie(), {
              expires: 7, //days
              path: "/",
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
            });

            router.push("/");
            router.refresh();
          } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Wrong email or password");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, values, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button variant="link" asChild>
              <Link href="#">Forgot password?</Link>
            </Button>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <span className="leading-7 not-first:mt-6">
          Don&apos;t have an account?
        </span>
        <Button variant="link" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
