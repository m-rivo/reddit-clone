"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { pb } from "@/lib/pocketbase";
import { Form, Formik } from "formik";
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { passwordResetSchema } from "@/lib/schemas";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";

export default function ConfirmVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("No token found.");
      router.push("/login");
      return;
    }
  }, [searchParams, router, token]);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Reset Your Password
      </h2>
      <Formik
        initialValues={{
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={toFormikValidationSchema(passwordResetSchema)}
        onSubmit={async (values, { setSubmitting }) => {
          if (!token) {
            toast.error("No token found.");
            router.push("/login");
            return;
          }

          try {
            await pb
              .collection("users")
              .confirmPasswordReset(
                token,
                values.password,
                values.passwordConfirm,
              );
            toast.success(`You have successfully reset your password.`);
            router.push("/login");
          } catch (err: any) {
            console.error(err);
            toast.error(err.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className="flex flex-col gap-4">
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field data-invalid={touched.password && !!errors.password}>
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
                  {touched.password && errors.password && (
                    <FieldError>{errors.password}</FieldError>
                  )}
                </Field>
                <Field
                  data-invalid={
                    touched.passwordConfirm && !!errors.passwordConfirm
                  }
                >
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    name="passwordConfirm"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                  />
                  {touched.passwordConfirm && errors.passwordConfirm && (
                    <FieldError>{errors.passwordConfirm}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <div>
              <Button disabled={isSubmitting}>
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
          <Link href="/login">Login</Link>
        </Button>
      </div>
      <div className="text-sm">
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
