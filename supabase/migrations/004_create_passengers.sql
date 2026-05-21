create table if not exists passengers (
    id uuid primary key default gen_random_uuid(),

    booking_id uuid not null
        references bookings(id)
        on delete cascade,

    full_name varchar(150) not null,

    passport_no varchar(50) not null,

    nationality varchar(100) not null,

    dob date not null,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index idx_passengers_booking
on passengers(booking_id);