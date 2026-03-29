import { LoginForm } from "@/presentation/components/auth/login-form/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Dynamic Background Gradients using global components */}
      <div className="bg-gradient-glow bg-blue-500/20 top-[-20%] left-[-10%] w-[50vw] h-[50vw]" />
      <div className="bg-gradient-glow bg-violet-500/20 bottom-[-20%] right-[-10%] w-[50vw] h-[50vw]" />

      <div className="relative z-10 w-full max-w-md mx-4 card-glass">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-600 dark:from-blue-400 dark:to-violet-400 tracking-tight mb-3">
            DevLog Admin
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Enter your credentials to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
