"use client";

import { useEffect, useState } from "react";
import { useFlightStore } from "@/store/useFlightStore";
import { Seat } from "@/types/seat";
import SeatComponent from "./Seat";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SeatMapProps {
  seats: Seat[];
  flightId: string;
  passengerData: {
    full_name: string;
    passport_no: string;
    nationality: string;
    dob: string;
  };
}

export default function SeatMap({
  seats,
  flightId,
  passengerData
}: SeatMapProps) {
  const router = useRouter();
  const supabase = createClient();

  const {
    setSelectedSeat: setSelectedSeatStore,
    setBookingStep
  } = useFlightStore();

  const [seatList, setSeatList] = useState<Seat[]>(seats);
  const [selectedSeat, setLocalSelectedSeat] =
    useState<Seat | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`seats-${flightId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "seats",
          filter: `flight_id=eq.${flightId}`
        },
        (payload) => {
          const updatedSeat = payload.new as Seat;

          setSeatList((prevSeats) =>
            prevSeats.map((seat) =>
              seat.id === updatedSeat.id ? updatedSeat : seat
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [flightId]);

  const firstClass = seatList.filter(
    (seat) => seat.class === "first"
  );

  const businessClass = seatList.filter(
    (seat) => seat.class === "business"
  );

  const economyClass = seatList.filter(
    (seat) => seat.class === "economy"
  );

  function renderSeats(section: Seat[]) {
    return section.map((seat) => (
      <SeatComponent
        key={seat.id}
        seat={seat}
        selectedSeatId={selectedSeat?.id || null}
        onSelect={(seat) => {
          setLocalSelectedSeat(seat);
          setSelectedSeatStore(seat);
        }}
      />
    ));
  }

  function handleContinue() {
    if (!selectedSeat) return;

    setBookingStep(3);

    const params = new URLSearchParams({
      seat_id: selectedSeat.id,
      full_name: passengerData.full_name,
      passport_no: passengerData.passport_no,
      nationality: passengerData.nationality,
      dob: passengerData.dob
    });

    router.push(
      `/flights/${flightId}/confirmation?${params.toString()}`
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
              ✈
            </div>


            <h2 className="mt-3 text-4xl font-bold">
              Choose Your Seat
            </h2>

            <p className="mt-3 text-slate-600">
              Real-time seat availability updates.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-green-500" />
              Available
            </div>

            <div className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-red-500" />
              Occupied
            </div>

            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-blue-500" />
              Your Seat
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="mb-8 rounded-2xl bg-slate-200 p-4 text-center font-semibold text-slate-600">
              Seats 
            </div>

            <div className="space-y-10 overflow-x-auto">
              <div>
                <h3 className="mb-4 text-xl font-bold text-amber-600">
                  First Class
                </h3>

                <div className="grid min-w-[420px] grid-cols-4 gap-4">
                  {renderSeats(firstClass)}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-purple-600">
                  Business Class
                </h3>

                <div className="grid min-w-[420px] grid-cols-4 gap-4">
                  {renderSeats(businessClass)}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-blue-600">
                  Economy Class
                </h3>

                <div className="grid min-w-[420px] grid-cols-6 gap-4">
                  {renderSeats(economyClass)}
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={!selectedSeat}
            onClick={handleContinue}
            className="mt-10 w-full rounded-2xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Continue to Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}