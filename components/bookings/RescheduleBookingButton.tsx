"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Flight {
  id: string;
  flight_no: string;
  origin: string;
  destination: string;
  base_price: number;
}

interface Props {
  bookingId: string;
  userId: string;
  currentFlightId: string;
  currentOrigin: string;
  currentDestination: string;
}

export default function RescheduleBookingButton({
  bookingId,
  userId,
  currentFlightId,
  currentOrigin,
  currentDestination
}: Props) {
  const supabase = createClient();
  const router = useRouter();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFlights() {
      const { data } = await supabase
        .from("flights")
        .select("*")
        .eq("origin", currentOrigin)
        .eq("destination", currentDestination);

      if (data) {
        const filtered = data.filter(
          (flight) => flight.id !== currentFlightId
        );

        setFlights(filtered);
      }
    }

    fetchFlights();
  }, [
    currentFlightId,
    currentOrigin,
    currentDestination
  ]);

  async function handleReschedule() {
    if (!selectedFlight) {
      alert("Please select a flight");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reschedule this booking?"
    );

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase.rpc(
      "reschedule_booking",
      {
        p_booking_id: bookingId,
        p_user_id: userId,
        p_new_flight_id: selectedFlight
      }
    );

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowSelector(false);
    setSelectedFlight("");

    router.refresh();
  }

  return (
    <div className="mt-4">
      {!showSelector ? (
        <button
          onClick={() => setShowSelector(true)}
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Reschedule Booking
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <select
            value={selectedFlight}
            onChange={(e) =>
              setSelectedFlight(e.target.value)
            }
            className="rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
          >
            <option value="">
              Select alternative flight
            </option>

            {flights.map((flight) => (
              <option
                key={flight.id}
                value={flight.id}
              >
                {flight.flight_no} | ₹
                {flight.base_price}
              </option>
            ))}
          </select>

          <button
            onClick={handleReschedule}
            disabled={loading}
            className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Rescheduling..."
              : "Confirm Reschedule"}
          </button>
        </div>
      )}
    </div>
  );
}