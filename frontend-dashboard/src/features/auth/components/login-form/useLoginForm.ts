import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "@/store/AuthContext";
import {
  defaultLoginValues,
  loginSchema,
  LoginSchema,
} from "../../schemas/auth.schema";

export const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [serverError, setServerError] = useState<string | null>(null);

  const loginForm = useForm<LoginSchema>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = async (data: LoginSchema) => {
    setServerError(null);

    try {
      await login(data.email, data.password);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Fallo en la autenticación:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Credenciales incorrectas o error de servidor.";
      setServerError(errorMessage);
    }
  };

  return {
    loginForm,
    onSubmit: loginForm.handleSubmit(onSubmitHandler),
    isLoading: loginForm.formState.isSubmitting,
    serverError,
  };
};
