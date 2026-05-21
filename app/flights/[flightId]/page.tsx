import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface FlightDetailsPageProps {
  params: Promise<{
    flightId: string;
  }>;
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getDuration(start: string, end: string) {
  const dep = new Date(start);
  const arr = new Date(end);

  const diffMs = arr.getTime() - dep.getTime();
  const mins = Math.floor(diffMs / 60000);

  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;

  return `${hours}h ${remaining}m`;
}

export default async function FlightDetailsPage({
  params
}: FlightDetailsPageProps) {
  const { flightId } = await params;

  const supabase = await createClient();

  const { data: flight, error } = await supabase
    .from("flights")
    .select("*")
    .eq("id", flightId)
    .single();

  if (error || !flight) {
    return (
      <main className="min-h-screen bg-slate-100">
        <Navbar />
        <div className="flex min-h-[80vh] items-center justify-center p-6">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-red-600">
              Flight not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const duration = getDuration(
    flight.departs_at,
    flight.arrives_at
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
            <div className="mb-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                Economy
              </span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                Business
              </span>

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                First
              </span>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Flight Details
                </p>

                <h1 className="mt-3 text-4xl font-bold">
                  {flight.flight_no}
                </h1>

                <p className="mt-4 text-slate-600">
                  Aircraft: {flight.aircraft_type}
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold text-blue-600">
                  ₹{flight.base_price}
                </p>

                <p className="text-slate-500">
                  per passenger
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Departure
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {formatTime(flight.departs_at)}
                </p>

                <p className="mt-1 text-slate-600">
                  {flight.origin}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Duration
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {duration}
                </p>

                <p className="mt-1 text-slate-600">
                  Direct Flight
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Arrival
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {formatTime(flight.arrives_at)}
                </p>

                <p className="mt-1 text-slate-600">
                  {flight.destination}
                </p>
              </div>
            </div>

            <Link
              href={`/flights/${flight.id}/booking`}
              className="mt-10 inline-block w-full rounded-2xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Continue Booking
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}