"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log("LOGIN RESPONSE:", data, error);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    alert("Login success");

    window.location.href = "/bookings";
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
    >
      <h1 className="text-3xl font-bold">Login</h1>

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary p-3 font-semibold text-white"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}