"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightStore } from "@/store/useFlightStore";

interface BookingFormProps {
  flightId: string;
}

export default function BookingForm({
  flightId
}: BookingFormProps) {
  const router = useRouter();

  const {
    setPassengerData,
    setSelectedFlightId,
    setBookingStep
  } = useFlightStore();

  const [fullName, setFullName] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");

  function handleContinue(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSelectedFlightId(flightId);

    setPassengerData({
      full_name: fullName,
      passport_no: passportNo,
      nationality,
      dob
    });

    setBookingStep(2);

    const params = new URLSearchParams({
      full_name: fullName,
      passport_no: passportNo,
      nationality,
      dob
    });

    router.push(
      `/flights/${flightId}/seat-selection?${params.toString()}`
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 p-6">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleContinue}
          className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
              👤
            </div>

            

            <h2 className="mt-3 text-4xl font-bold">
              Passenger Details
            </h2>

            <p className="mt-3 text-slate-600">
              Enter passenger information to continue
              your booking.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                required
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Passport Number
              </label>

              <input
                type="text"
                required
                placeholder="Passport number"
                value={passportNo}
                onChange={(e) =>
                  setPassportNo(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nationality
              </label>

              <input
                type="text"
                required
                placeholder="Nationality"
                value={nationality}
                onChange={(e) =>
                  setNationality(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date of Birth
              </label>

              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Continue to Seat Selection
          </button>
        </form>
      </div>
    </div>
  );
}