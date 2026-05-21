import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Seat } from "@/types/seat";

interface PassengerData {
  full_name: string;
  passport_no: string;
  nationality: string;
  dob: string;
}

interface SearchQuery {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

interface FlightStore {
  searchQuery: SearchQuery | null;
  selectedFlightId: string | null;
  selectedSeat: Seat | null;
  bookingStep: number;
  passengerData: PassengerData | null;

  setSearchQuery: (query: SearchQuery) => void;
  setSelectedFlightId: (flightId: string) => void;
  setSelectedSeat: (seat: Seat) => void;
  setBookingStep: (step: number) => void;
  setPassengerData: (data: PassengerData) => void;
  resetBooking: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist(
    (set) => ({
      searchQuery: null,
      selectedFlightId: null,
      selectedSeat: null,
      bookingStep: 1,
      passengerData: null,

      setSearchQuery: (query) =>
        set({
          searchQuery: query
        }),

      setSelectedFlightId: (flightId) =>
        set({
          selectedFlightId: flightId
        }),

      setSelectedSeat: (seat) =>
        set({
          selectedSeat: seat
        }),

      setBookingStep: (step) =>
        set({
          bookingStep: step
        }),

      setPassengerData: (data) =>
        set({
          passengerData: data
        }),

      resetBooking: () =>
        set({
          selectedFlightId: null,
          selectedSeat: null,
          bookingStep: 1,
          passengerData: null
        })
    }),
    {
      name: "flight-booking-store",

      partialize: (state) => ({
        searchQuery: state.searchQuery,
        selectedFlightId: state.selectedFlightId,
        selectedSeat: state.selectedSeat,
        bookingStep: state.bookingStep,

        passengerData: state.passengerData
          ? {
              full_name: state.passengerData.full_name,
              nationality: state.passengerData.nationality,
              dob: state.passengerData.dob
            }
          : null
      })
    }
  )
);