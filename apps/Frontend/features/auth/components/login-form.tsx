"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginType } from "../schema zod/loginShema"
import { useLogin } from "../queries/login"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { CheckCircle2Icon, Divide, InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {
    control,
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, isPending, error } = useLogin();


  function onSubmit(data: LoginType) {
    mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      {/* ALERTS */}
      {error
        &&
        <div className="grid w-full max-w-md items-start gap-4">
          <Alert className="bg-red-500/10 border-red-500 text-red-500">
            <InfoIcon />
            <AlertTitle>Login failed</AlertTitle>
            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>
        </div>
      }

      {/* FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Connectez-vous à votre compte</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Mot de passe
                      </FieldLabel>

                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Mot de passe oublié?
                      </a>
                    </div>

                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="entrer votre mot de passe"
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
                  Se connecter
                </Button>

                <FieldSeparator className="my-4">
                  Ou continuer avec
                </FieldSeparator>

                <Button variant="outline" type="button" className="cursor-pointer">
                  Se connecter avec Google
                </Button>

                <FieldDescription className="text-center">
                  Vous n'avez pas de compte? <a href="/signup">Inscrivez-vous</a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}