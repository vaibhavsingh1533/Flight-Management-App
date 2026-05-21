create or replace function cancel_booking(
    p_booking_id uuid,
    p_user_id uuid
)
returns boolean
language plpgsql
security definer
as $$
declare
    v_seat_id uuid;
    v_departure timestamptz;
begin
    select
        bookings.seat_id,
        flights.departs_at
    into
        v_seat_id,
        v_departure
    from bookings
    join flights
        on flights.id = bookings.flight_id
    where bookings.id = p_booking_id
    and bookings.user_id = p_user_id
    for update;

    if not found then
        raise exception 'Booking not found';
    end if;

    if v_departure <= now() + interval '2 hours' then
        raise exception 'Cancellation not allowed within 2 hours of departure';
    end if;

    update bookings
    set
        status = 'cancelled',
        updated_at = now()
    where id = p_booking_id;

    update seats
    set
        is_available = true,
        updated_at = now()
    where id = v_seat_id;

    return true;
end;
$$;