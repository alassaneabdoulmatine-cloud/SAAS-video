"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Spinner } from "@/components/ui/spinner";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signupSchema, SignupType } from "../schema zod/signupShema";
import { useSignup } from "../queries/signup";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    control,
    handleSubmit,
    watch,
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, error } = useSignup();

  function onSubmit(data: SignupType) {
    mutate(data);
  }

  const password = watch("password");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      {/* ERROR */}
      {error && (
        <div className="grid w-full max-w-md items-start gap-4">
          <Alert className="bg-red-500/10 border-red-500 text-red-500">
            <InfoIcon />
            <AlertTitle>Signup failed</AlertTitle>
            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Entrez vos informations pour créer votre compte
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* NAME */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="name">Nom</FieldLabel>

                    <Input
                      {...field}
                      id="name"
                      placeholder="John Doe"
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* EMAIL */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>

                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>

                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="entrer un mot de passe"
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <FieldDescription>
                      Doit contenir au moins 8 caractères.
                    </FieldDescription>
                  </Field>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirmer le mot de passe
                    </FieldLabel>

                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="confirmer le mot de passe"
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* ACTIONS */}
              <Field>
                <Button type="submit" className="cursor-pointer">
                  {isPending && <Spinner />}
                  Créer un compte
                </Button>

                <FieldSeparator className="my-4">
                  Ou continuer avec
                </FieldSeparator>

                <Button variant="outline" type="button" className="cursor-pointer">
                  S'inscrire avec Google
                </Button>

                <FieldDescription className="text-center">
                  Vous avez déjà un compte?{" "}
                  <a href="/login">Se connecter</a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}