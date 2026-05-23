import { createClient } from "@/lib/supabase/server";
import SeatMap from "@/components/seats/SeatMap";
import { redirect } from "next/navigation";

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

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: seats } = await supabase
    .from("seats")
    .select("*")
    .eq("flight_id", params.flightId)
    .order("seat_number");

  const { data: flight } = await supabase
    .from("flights")
    .select("base_price")
    .eq("id", params.flightId)
    .single();

  if (!seats || !flight) {
    redirect("/");
  }

  return (
    <main>
      <SeatMap
        seats={seats}
        flightId={params.flightId}
        passengerData={searchParams}
        basePrice={Number(flight.base_price)}
      />
    </main>
  );
}