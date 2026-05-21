create table if not exists reschedules (
    id uuid primary key default gen_random_uuid(),

    booking_id uuid not null
        references bookings(id)
        on delete cascade,

    old_flight_id uuid not null
        references flights(id)
        on delete cascade,

    new_flight_id uuid not null
        references flights(id)
        on delete cascade,

    requested_at timestamptz not null default now(),

    fee_charged numeric(10,2) not null default 0
        check (fee_charged >= 0),

    created_at timestamptz default now(),
    updated_at timestamptz default now(),

    check (old_flight_id <> new_flight_id)
);

create index idx_reschedules_booking
on reschedules(booking_id);

create index idx_reschedules_old_flight
on reschedules(old_flight_id);

create index idx_reschedules_new_flight
on reschedules(new_flight_id);