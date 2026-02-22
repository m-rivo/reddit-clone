"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signupSchema } from "@/lib/schemas";

export default function Signup() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Sign up
      </h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={toFormikValidationSchema(signupSchema)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await pb.collection("users").create({
              email: values.email,
              password: values.password,
              passwordConfirm: values.passwordConfirm,
              emailVisibility: true,
            });
            await pb.collection("users").requestVerification(values.email);
            toast.success(
              "Success! A verification link has been sent to your email account.",
            );
            resetForm();
          } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Error creating account");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <Form className="flex flex-col gap-4">
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field data-invalid={touched.email && !!errors.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    autoFocus
                  />
                  {touched.email && errors.email && (
                    <FieldError>{errors.email}</FieldError>
                  )}
                </Field>
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
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <Spinner data-icon="inline-start" /> Loading...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-sm">
        <span className="leading-7 not-first:mt-6">
          Already have an account?{" "}
        </span>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
