import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          
          <div className="hidden flex-col justify-center bg-blue-600 p-10 text-white lg:flex">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
              SkyBook
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Welcome Back
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Manage bookings, explore flights, and travel smarter with our premium flight management experience.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✓ Secure authentication</p>
              <p>✓ Realtime seat booking</p>
              <p>✓ Easy rescheduling & cancellation</p>
              <p>✓ Offline PWA support</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Login to your account
              </h2>

              <p className="mt-2 text-slate-500">
                Continue your flight booking journey
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don’t have an account?
              </p>

              <Link
                href="/auth/signup"
                className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}