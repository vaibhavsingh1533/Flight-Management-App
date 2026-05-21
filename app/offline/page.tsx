export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 p-6">
      <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
          📡
        </div>

        <h1 className="text-3xl font-bold">
          You're Offline
        </h1>

        <p className="mt-4 text-slate-600">
          No internet connection detected.
          Previously cached pages may still work.
        </p>
      </div>
    </main>
  );
}