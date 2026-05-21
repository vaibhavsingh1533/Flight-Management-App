create or replace function reschedule_booking(
    p_booking_id uuid,
    p_user_id uuid,
    p_new_flight_id uuid
)
returns boolean
language plpgsql
security definer
as $$
declare
    v_old_flight_id uuid;
    v_old_price numeric;
    v_new_price numeric;
    v_fee numeric;
begin
    select
        bookings.flight_id,
        flights.base_price
    into
        v_old_flight_id,
        v_old_price
    from bookings
    join flights
        on flights.id = bookings.flight_id
    where bookings.id = p_booking_id
    and bookings.user_id = p_user_id
    for update;

    if not found then
        raise exception 'Booking not found';
    end if;

    select base_price
    into v_new_price
    from flights
    where id = p_new_flight_id;

    if not found then
        raise exception 'New flight not found';
    end if;

    if v_old_flight_id = p_new_flight_id then
        raise exception 'Cannot reschedule to same flight';
    end if;

    v_fee := greatest(v_new_price - v_old_price, 0);

    insert into reschedules (
        booking_id,
        old_flight_id,
        new_flight_id,
        fee_charged
    )
    values (
        p_booking_id,
        v_old_flight_id,
        p_new_flight_id,
        v_fee
    );

    update bookings
    set
        flight_id = p_new_flight_id,
        total_price = total_price + v_fee,
        status = 'rescheduled',
        updated_at = now()
    where id = p_booking_id;

    return true;
end;
$$;