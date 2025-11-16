"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

const signinSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe requis"),
});

type SigninValues = z.infer<typeof signinSchema>;

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SigninValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signinSchema),
  });

  async function handleSubmit(values: SigninValues) {
    setSubmitError(null);
    startTransition(async () => {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        setSubmitError("Identifiants invalides");
        toast.error("Connexion impossible", {
          description: "Vérifiez votre email et votre mot de passe.",
        });
        return;
      }

      toast.success("Bienvenue", {
        description: `Heureux de vous revoir à ${siteConfig.name}`,
      });
      router.push("/dashboard");
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email professionnel</Label>
        <Input
          id="email"
          type="email"
          placeholder="direction@maisonlagune.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-400">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-sm text-red-400">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm font-medium text-red-400">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-500 text-black hover:bg-amber-400"
      >
        {isPending ? "Connexion..." : "Accéder au tableau de bord"}
      </Button>
    </form>
  );
}
