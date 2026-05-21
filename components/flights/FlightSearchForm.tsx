"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFlightStore } from "@/store/useFlightStore";
import { createClient } from "@/lib/supabase/client";

interface Route {
  origin: string;
  destination: string;
}

export default function FlightSearchForm() {
  const router = useRouter();
  const supabase = createClient();
  const { setSearchQuery } = useFlightStore();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    async function fetchRoutes() {
      const { data } = await supabase
        .from("flights")
        .select("origin, destination");

      if (data) {
        setRoutes(data);

        const uniqueOrigins = Array.from(
          new Set(data.map((route) => route.origin))
        );

        setOrigins(uniqueOrigins);
      }
    }

    fetchRoutes();
  }, []);

  useEffect(() => {
    if (!origin) {
      setDestinations([]);
      setDestination("");
      return;
    }

    const filteredDestinations = routes
      .filter((route) => route.origin === origin)
      .map((route) => route.destination);

    setDestinations(Array.from(new Set(filteredDestinations)));
    setDestination("");
  }, [origin, routes]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSearchQuery({
      origin,
      destination,
      date,
      passengers
    });

    const params = new URLSearchParams({
      origin,
      destination,
      date,
      passengers: passengers.toString()
    });

    router.push(`/flights?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-md sm:p-8 md:grid-cols-2"
    >
      <select
        required
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="rounded-xl border border-white/20 bg-white/20 p-3 text-white outline-none backdrop-blur-md"
      >
        <option value="" className="text-black">
          Select Origin
        </option>

        {origins.map((city) => (
          <option
            key={city}
            value={city}
            className="text-black"
          >
            {city}
          </option>
        ))}
      </select>

      <select
        required
        value={destination}
        disabled={!origin}
        onChange={(e) => setDestination(e.target.value)}
        className="rounded-xl border border-white/20 bg-white/20 p-3 text-white outline-none backdrop-blur-md"
      >
        <option value="" className="text-black">
          {origin
            ? "Select Destination"
            : "Select Origin First"}
        </option>

        {destinations.map((city) => (
          <option
            key={city}
            value={city}
            className="text-black"
          >
            {city}
          </option>
        ))}
      </select>

      <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded-xl border border-white/20 bg-white/20 p-3 text-white outline-none"
      />

      <input
        type="number"
        min={1}
        max={10}
        value={passengers}
        onChange={(e) => setPassengers(Number(e.target.value))}
        className="rounded-xl border border-white/20 bg-white/20 p-3 text-white outline-none"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-500 p-4 font-semibold text-white transition hover:bg-blue-600 md:col-span-2"
      >
        Search Flights
      </button>
    </form>
  );
}