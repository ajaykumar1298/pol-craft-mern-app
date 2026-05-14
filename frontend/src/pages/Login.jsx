import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/Validator";
import { loginUser } from "../api/authApi";
import { setUserDetails } from "../utils/Storage";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!form.email || !form.password) {
        toast.error("All fields are required");
        return;
      }
      if (!validateEmail(form.email)) {
        toast.error("Invalid Email");
        return;
      }
      setLoading(true);
      const data = await loginUser(form);
      let user = {
        username: data.data.user.username,
        email: data.data.user.email,
      };
      setUserDetails(user);
      toast.success("Login Successful");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-[#0a0a14] px-6 py-8">
      <div className="w-full max-w-[420px] rounded-2xl border border-[#2a2a3d] bg-[#12122a] p-9">
        {/* Heading */}
        <h2 className="mb-2 text-3xl font-bold text-[#a78bfa]">Login User</h2>

        <p className="mb-7 text-sm text-[#6b7280]">
          Sign in to your pollCraft account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label className="text-[13px] font-medium text-[#9ca3af]">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
              className="mt-1.5 w-full rounded-lg border border-[#374151] bg-[#0f0f1a] px-4 py-3 text-[15px] text-white outline-none transition focus:border-[#7c3aed]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-[13px] font-medium text-[#9ca3af]">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              className="mt-1.5 w-full rounded-lg border border-[#374151] bg-[#0f0f1a] px-4 py-3 text-[15px] text-white outline-none transition focus:border-[#7c3aed]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 text-[15px] font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-[#5b21b6]"
                : "bg-[#7c3aed] hover:bg-[#6d28d9]"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-[#6b7280]">
          Don’t have an account?
          <Link
            to="/register"
            className="text-[#a78bfa] transition hover:text-[#c4b5fd] pl-2"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
