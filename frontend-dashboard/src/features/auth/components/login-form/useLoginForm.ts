import { useForm } from "react-hook-form";
import {
  defaultLoginValues,
  loginSchema,
  LoginSchema,
} from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
  const loginForm = useForm<LoginSchema>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = () => {
    console.log(loginForm.getValues());
  };

  return { loginForm, onSubmit };
};
