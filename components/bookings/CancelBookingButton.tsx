"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useFlightStore } from "@/store/useFlightStore";

interface CancelBookingButtonProps {
  bookingId: string;
  userId: string;
}

export default function CancelBookingButton({
  bookingId,
  userId
}: CancelBookingButtonProps) {
  const supabase = createClient();
  const router = useRouter();
  const { resetBooking } = useFlightStore();

  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase.rpc("cancel_booking", {
      p_booking_id: bookingId,
      p_user_id: userId
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    resetBooking();
    router.refresh();
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}