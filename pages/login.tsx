import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/Login/LoginForm"), {
  ssr: false,
});

export default function LoginPage() {
  return <LoginForm />;
}
