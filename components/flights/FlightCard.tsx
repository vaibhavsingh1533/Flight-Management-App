import Link from "next/link";
import { Flight } from "@/types/Flight";

interface FlightCardProps {
  flight: Flight;
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

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function FlightCard({
  flight
}: FlightCardProps) {
  const duration = getDuration(
    flight.departs_at,
    flight.arrives_at
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Economy
            </span>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
              Business
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              First
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-bold">
                {formatTime(flight.departs_at)}
              </p>
              <p className="text-slate-600">
                {flight.origin}
              </p>
            </div>

            <div className="flex flex-col items-center flex-1 px-4">
              <p className="text-sm text-slate-500">
                {duration}
              </p>

              <div className="my-2 h-[2px] w-full bg-slate-300 relative">
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500" />
              </div>

              <p className="text-xs text-slate-500">
                {flight.flight_no}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {formatTime(flight.arrives_at)}
              </p>
              <p className="text-slate-600">
                {flight.destination}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Aircraft: {flight.aircraft_type}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <div className="text-center lg:text-right">
            <p className="text-3xl font-bold text-blue-600">
              ₹{flight.base_price}
            </p>

            <p className="text-sm text-slate-500">
              per passenger
            </p>
          </div>

          <Link
            href={`/flights/${flight.id}`}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Select Flight
          </Link>
        </div>
      </div>
    </div>
  );
}