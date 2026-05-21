import BookingForm from "@/components/bookings/BookingForm";

interface BookingPageProps {
  params: {
    flightId: string;
  };
}

export default function BookingPage({
  params
}: BookingPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl">
        <BookingForm flightId={params.flightId} />
      </div>
    </main>
  );
}