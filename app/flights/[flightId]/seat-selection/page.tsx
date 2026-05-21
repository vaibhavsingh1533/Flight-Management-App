import { createClient } from "@/lib/supabase/server";
import SeatMap from "@/components/seats/SeatMap";

interface SeatSelectionPageProps {
  params: {
    flightId: string;
  };
  searchParams: {
    full_name: string;
    passport_no: string;
    nationality: string;
    dob: string;
  };
}

export default async function SeatSelectionPage({
  params,
  searchParams
}: SeatSelectionPageProps) {
  const supabase = await createClient();

  const { data: seats } = await supabase
    .from("seats")
    .select("*")
    .eq("flight_id", params.flightId)
    .order("seat_number");

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow">
        <SeatMap
          seats={seats || []}
          flightId={params.flightId}
          passengerData={searchParams}
        />
      </div>
    </main>
  );
}