create table if not exists flights (
    id uuid primary key default gen_random_uuid(),
    flight_no varchar(20) not null unique,
    origin varchar(100) not null,
    destination varchar(100) not null,
    departs_at timestamptz not null,
    arrives_at timestamptz not null,
    aircraft_type varchar(100) not null,
    status varchar(30) not null default 'scheduled',
    base_price numeric(10,2) not null check (base_price > 0),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index idx_flights_route
on flights(origin, destination);

create index idx_flights_departure
on flights(departs_at);