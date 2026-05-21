import { createClient } from "@/lib/supabase/server";
import { generatePNR } from "@/lib/utils/generatePNR";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ConfirmationPageProps {
  params: {
    flightId: string;
  };
  searchParams: {
    seat_id: string;
    full_name: string;
    passport_no: string;
    nationality: string;
    dob: string;
  };
}

export default async function ConfirmationPage({
  params,
  searchParams
}: ConfirmationPageProps) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: flight } = await supabase
    .from("flights")
    .select("*")
    .eq("id", params.flightId)
    .single();

  const { data: seat } = await supabase
    .from("seats")
    .select("*")
    .eq("id", searchParams.seat_id)
    .single();

  if (!flight || !seat) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-red-600">
            Booking Failed
          </h1>
          <p className="mt-2 text-slate-600">
            Flight or seat not found.
          </p>
        </div>
      </main>
    );
  }

  const totalPrice =
    Number(flight.base_price) + Number(seat.extra_fee);

  const pnr = generatePNR();

  const { data: bookingId, error } = await supabase.rpc(
    "reserve_seat",
    {
      p_user_id: user.id,
      p_flight_id: params.flightId,
      p_seat_id: searchParams.seat_id,
      p_total_price: totalPrice,
      p_pnr_code: pnr
    }
  );

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-red-600">
            Booking Failed
          </h1>
          <p className="mt-3 text-slate-600">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  await supabase.from("passengers").insert({
    booking_id: bookingId,
    full_name: searchParams.full_name,
    passport_no: searchParams.passport_no,
    nationality: searchParams.nationality,
    dob: searchParams.dob
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 p-6">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>

            <h1 className="mt-6 text-4xl font-bold text-green-600">
              Booking Confirmed
            </h1>

            <p className="mt-3 text-slate-600">
              Your flight has been successfully booked.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Booking Reference
            </p>

            <p className="mt-2 text-3xl font-bold tracking-widest text-blue-600">
              {pnr}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border p-5">
              <p className="text-sm text-slate-500">
                Passenger
              </p>
              <p className="mt-1 font-semibold">
                {searchParams.full_name}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm text-slate-500">
                Flight
              </p>
              <p className="mt-1 font-semibold">
                {flight.flight_no}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm text-slate-500">
                Route
              </p>
              <p className="mt-1 font-semibold">
                {flight.origin} → {flight.destination}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm text-slate-500">
                Seat
              </p>
              <p className="mt-1 font-semibold">
                {seat.seat_number}
              </p>
            </div>

            <div className="rounded-2xl border p-5 sm:col-span-2">
              <p className="text-sm text-slate-500">
                Total Paid
              </p>
              <p className="mt-1 text-2xl font-bold text-blue-600">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/bookings"
              className="flex-1 rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              View My Bookings
            </Link>

            <Link
              href="/"
              className="flex-1 rounded-xl border border-slate-300 px-6 py-4 text-center font-semibold transition hover:bg-slate-50"
            >
              Book Another Flight
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}