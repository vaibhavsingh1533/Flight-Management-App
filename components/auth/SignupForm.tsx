"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth/login");
  }

  return (
    <form
      onSubmit={handleSignup}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
    >
      <h1 className="text-3xl font-bold">Create Account</h1>

      {error && (
        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary p-3 font-semibold text-white"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}