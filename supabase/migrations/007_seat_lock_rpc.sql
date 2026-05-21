create or replace function reserve_seat(
    p_user_id uuid,
    p_flight_id uuid,
    p_seat_id uuid,
    p_total_price numeric,
    p_pnr_code varchar
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_booking_id uuid;
    v_available boolean;
begin
    select is_available
    into v_available
    from seats
    where id = p_seat_id
    and flight_id = p_flight_id
    for update;

    if not found then
        raise exception 'Seat not found';
    end if;

    if v_available = false then
        raise exception 'Seat already booked';
    end if;

    update seats
    set
        is_available = false,
        updated_at = now()
    where id = p_seat_id;

    insert into bookings (
        user_id,
        flight_id,
        seat_id,
        total_price,
        pnr_code,
        status
    )
    values (
        p_user_id,
        p_flight_id,
        p_seat_id,
        p_total_price,
        p_pnr_code,
        'confirmed'
    )
    returning id into v_booking_id;

    return v_booking_id;
end;
$$;