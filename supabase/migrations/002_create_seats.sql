create table if not exists seats (
    id uuid primary key default gen_random_uuid(),
    flight_id uuid not null references flights(id) on delete cascade,
    seat_number varchar(10) not null,
    class varchar(20) not null check (
        class in ('economy', 'business', 'first')
    ),
    is_available boolean not null default true,
    extra_fee numeric(10,2) not null default 0 check (extra_fee >= 0),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),

    unique (flight_id, seat_number)
);

create index idx_seats_flight
on seats(flight_id);

create index idx_seats_availability
on seats(flight_id, is_available);