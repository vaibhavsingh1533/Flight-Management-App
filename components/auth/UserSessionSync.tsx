"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/store/useUserStore";

interface Props {
  bookings: any[];
}

export default function UserSessionSync({
  bookings
}: Props) {
  const supabase = createClient();

  const {
    setSessionToken,
    setCachedBookings,
    cachedBookings
  } = useUserStore();

  useEffect(() => {
    async function syncSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setSessionToken(session?.access_token || null);

      if (bookings?.length > 0) {
        setCachedBookings(bookings);
      } else if (cachedBookings.length > 0) {
        setCachedBookings(cachedBookings);
      }
    }

    syncSession();
  }, [bookings, cachedBookings]);

  return null;
}