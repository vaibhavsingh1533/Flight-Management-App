create table if not exists bookings (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null,

    flight_id uuid not null
        references flights(id)
        on delete cascade,

    seat_id uuid not null
        references seats(id)
        on delete cascade,

    status varchar(30) not null default 'confirmed'
        check (
            status in (
                'confirmed',
                'rescheduled',
                'cancelled'
            )
        ),

    booked_at timestamptz not null default now(),

    total_price numeric(10,2) not null
        check (total_price > 0),

    pnr_code varchar(20) not null unique,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index idx_bookings_user
on bookings(user_id);

create index idx_bookings_flight
on bookings(flight_id);

create index idx_bookings_status
on bookings(status);