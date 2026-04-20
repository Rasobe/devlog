import { LoginForm, LoginHeader } from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Dynamic Background Gradients using global components */}
      <div className="bg-gradient-glow bg-blue-500/20 top-[-20%] left-[-10%] w-[50vw] h-[50vw]" />
      <div className="bg-gradient-glow bg-violet-500/20 bottom-[-20%] right-[-10%] w-[50vw] h-[50vw]" />

      <div className="relative z-10 w-full max-w-md mx-4 card-glass">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
