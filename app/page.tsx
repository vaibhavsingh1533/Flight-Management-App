import FlightSearchForm from "@/components/flights/FlightSearchForm";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      <div className="min-h-screen bg-black/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-bold text-white">
            
          </h1>

          <Link
            href="/bookings"
            className="rounded-lg border border-white/30 px-4 py-2 text-white backdrop-blur-md"
          >
            My Bookings
          </Link>
        </nav>

        <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/80">
              Premium Airline Booking Experience
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
              Book Your Next
              <span className="block text-blue-400">
                Journey With Confidence
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80">
              Search flights, choose seats in real time,
              manage bookings, and travel smarter
            </p>
          </div>

          <div className="mt-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl sm:p-6 lg:mt-0">
            <FlightSearchForm />
          </div>
        </div>
      </div>
    </main>
  );
}