"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pb } from "@/lib/pocketbase";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { toast } from "sonner";
import { Formik, Form } from "formik";

export default function Login() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Forgot your password?
      </h2>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await pb.collection("users").requestPasswordReset(values.email);
            toast.success(
              `We sent an email to ${values.email}. Please follow the instructions.`,
            );
          } catch (err: any) {
            console.error(err);
            toast.error(err.message);
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
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FieldDescription>
                    Please enter the email you use to log in to Reddit.
                  </FieldDescription>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Loading...
                  </>
                ) : (
                  "Request password reset"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-sm">
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/signup">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}
