create or replace function prevent_late_cancellation()
returns trigger
language plpgsql
as $$
declare
    v_departure timestamptz;
begin
    if old.status <> 'cancelled' and new.status = 'cancelled' then

        select departs_at
        into v_departure
        from flights
        where id = old.flight_id;

        if v_departure <= now() + interval '2 hours' then
            raise exception 'Cancellation not allowed within 2 hours of departure';
        end if;

    end if;

    return new;
end;
$$;

drop trigger if exists booking_cancellation_trigger on bookings;

create trigger booking_cancellation_trigger
before update on bookings
for each row
execute function prevent_late_cancellation();