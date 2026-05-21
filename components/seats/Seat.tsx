"use client";

import { Seat } from "@/types/seat";

interface SeatProps {
  seat: Seat;
  selectedSeatId: string | null;
  onSelect: (seat: Seat) => void;
}

export default function SeatComponent({
  seat,
  selectedSeatId,
  onSelect
}: SeatProps) {
  const isSelected = selectedSeatId === seat.id;

  let seatStyles =
    "bg-green-500 hover:scale-105 hover:shadow-lg";

  if (!seat.is_available) {
    seatStyles =
      "bg-red-500 cursor-not-allowed opacity-80";
  }

  if (isSelected) {
    seatStyles =
      "bg-blue-600 scale-110 shadow-2xl ring-4 ring-blue-200";
  }

  return (
    <button
      disabled={!seat.is_available}
      onClick={() => onSelect(seat)}
      title={`${seat.class.toUpperCase()} | Extra ₹${seat.extra_fee}`}
      className={`relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl font-bold text-white transition duration-200 sm:h-16 sm:w-16 ${seatStyles}`}
    >
      <div className="absolute top-1 h-2 w-8 rounded-full bg-white/30" />

      <span className="text-xs sm:text-sm">
        {seat.seat_number}
      </span>
    </button>
  );
}