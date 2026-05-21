import { createClient } from "@/lib/supabase/server";
import FlightCard from "@/components/flights/FlightCard";
import Navbar from "@/components/layout/Navbar";

interface FlightsPageProps {
  searchParams: {
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  };
}

export default async function FlightsPage({
  searchParams
}: FlightsPageProps) {
  const supabase = await createClient();

  const { origin, destination } = searchParams;

  let query = supabase
    .from("flights")
    .select("*");

  if (origin) {
    query = query.eq("origin", origin);
  }

  if (destination) {
    query = query.eq("destination", destination);
  }

  const { data: flights } = await query;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Search Results
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Available Flights
            </h1>

            {origin && destination && (
              <p className="mt-3 text-slate-600 text-lg">
                {origin} → {destination}
              </p>
            )}
          </div>

          {flights?.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                ✈
              </div>

              <h2 className="text-2xl font-bold">
                No flights found
              </h2>

              <p className="mt-3 text-slate-600">
                Try selecting a different route.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {flights?.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}