"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useFlightStore } from "@/store/useFlightStore";
import { useUserStore } from "@/store/useUserStore";

export default function LogoutButton() {
  const supabase = createClient();

  const { resetBooking } = useFlightStore();
  const { resetUserStore } = useUserStore();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    resetBooking();
    resetUserStore();

    window.location.href = "/auth/login";
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg bg-slate-800 px-4 py-2 text-white"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}