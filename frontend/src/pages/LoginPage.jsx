import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/common/AuthLayout";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
      await login(formData);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 outline-none"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3 outline-none"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-black text-white rounded-lg py-3 font-medium cursor-pointer"
        >
          {isLoggingIn
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-black"
        >
          Signup
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;