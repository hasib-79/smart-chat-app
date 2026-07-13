import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from '../components/common/AuthLayout'
import { useAuthStore } from "../store/useAuthStore";

function SignupPage() {
  const { signup, isSigningUp } = useAuthStore();

  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  }

  return (
    <AuthLayout
      title={"Create Acoount"}
      subtitle={"Signup to continue"}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-lg px-4 py-3 outline-none"
          value={formData.name}
          onChange={(e) => setformData({ ...formData, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 outline-none"
          value={formData.email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3 outline-none"
          value={formData.password}
          onChange={(e) => setformData({ ...formData, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full bg-black text-white rounded-lg py-3 font-medium cursor-pointer"
        >
          {isSigningUp
            ? "Creating Account..."
            : "Signup"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link to={'/login'} className="font-medium text-black">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;