import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CancelBookingButton from "@/components/bookings/CancelBookingButton";
import RescheduleBookingButton from "@/components/bookings/RescheduleBookingButton";
import UserSessionSync from "@/components/auth/UserSessionSync";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      flights (*),
      seats (*)
    `)
    .eq("user_id", user.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
      <Navbar showLogout />

      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <UserSessionSync bookings={bookings || []} />

          <div className="mb-10">
           

            <h1 className="mt-2 text-4xl font-bold">
              My Bookings
            </h1>
          </div>

          {bookings?.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                ✈
              </div>

              <h2 className="text-2xl font-bold">
                No bookings yet
              </h2>

              <p className="mt-3 text-slate-600">
                Start your next journey by booking a flight.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
              >
                Book Your First Flight
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-3xl bg-white p-6 shadow-xl transition hover:shadow-2xl"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                          {booking.flights.flight_no}
                        </h2>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status ===
                                "rescheduled"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-sm text-slate-500">
                            Route
                          </p>
                          <p className="mt-1 font-semibold">
                            {booking.flights.origin} →{" "}
                            {booking.flights.destination}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-sm text-slate-500">
                            Seat
                          </p>
                          <p className="mt-1 font-semibold">
                            {booking.seats.seat_number}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-sm text-slate-500">
                            Total Paid
                          </p>
                          <p className="mt-1 font-semibold text-blue-600">
                            ₹{booking.total_price}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-sm text-slate-500">
                            PNR
                          </p>
                          <p className="mt-1 font-semibold tracking-wider">
                            {booking.pnr_code}
                          </p>
                        </div>
                      </div>
                    </div>

                    {booking.status !== "cancelled" && (
                      <div className="flex flex-col gap-3 lg:w-72">
                        <RescheduleBookingButton
                          bookingId={booking.id}
                          userId={user.id}
                          currentFlightId={booking.flight_id}
                          currentOrigin={
                            booking.flights.origin
                          }
                          currentDestination={
                            booking.flights.destination
                          }
                        />

                        <CancelBookingButton
                          bookingId={booking.id}
                          userId={user.id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}