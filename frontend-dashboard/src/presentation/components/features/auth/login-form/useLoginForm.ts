import { ROUTES } from "@/presentation/config/routes";
import {
  defaultLoginValues,
  loginSchema,
  type LoginSchema,
} from "@/presentation/schemas/";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuthContext();

  const loginForm = useForm<LoginSchema>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
      router.push(ROUTES.DASHBOARD);
    } catch {
      toast.error("Credenciales incorrectas");
    }
  };

  return {
    loginForm,
    onSubmit: loginForm.handleSubmit(onSubmitHandler),
    isLoading: loginForm.formState.isSubmitting,
  };
};
