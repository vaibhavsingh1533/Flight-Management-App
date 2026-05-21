import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

interface NavbarProps {
  showLogout?: boolean;
}

export default function Navbar({
  showLogout = false
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          Flights
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>

          <Link
            href="/bookings"
            className="rounded-xl px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            My Bookings
          </Link>

          {showLogout && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}