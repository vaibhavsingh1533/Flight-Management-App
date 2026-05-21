alter table flights enable row level security;
alter table seats enable row level security;
alter table bookings enable row level security;
alter table passengers enable row level security;
alter table reschedules enable row level security;

---------------------------------------------------
-- FLIGHTS (public read)
---------------------------------------------------
create policy "public can read flights"
on flights
for select
using (true);

---------------------------------------------------
-- SEATS (public read)
---------------------------------------------------
create policy "public can read seats"
on seats
for select
using (true);

---------------------------------------------------
-- BOOKINGS (owner only)
---------------------------------------------------
create policy "users can view own bookings"
on bookings
for select
using (auth.uid() = user_id);

create policy "users can create own bookings"
on bookings
for insert
with check (auth.uid() = user_id);

create policy "users can update own bookings"
on bookings
for update
using (auth.uid() = user_id);

---------------------------------------------------
-- PASSENGERS (owner via booking)
---------------------------------------------------
create policy "users can view own passengers"
on passengers
for select
using (
    exists (
        select 1
        from bookings
        where bookings.id = passengers.booking_id
        and bookings.user_id = auth.uid()
    )
);

create policy "users can insert own passengers"
on passengers
for insert
with check (
    exists (
        select 1
        from bookings
        where bookings.id = passengers.booking_id
        and bookings.user_id = auth.uid()
    )
);

---------------------------------------------------
-- RESCHEDULES (owner via booking)
---------------------------------------------------
create policy "users can view own reschedules"
on reschedules
for select
using (
    exists (
        select 1
        from bookings
        where bookings.id = reschedules.booking_id
        and bookings.user_id = auth.uid()
    )
);

create policy "users can insert own reschedules"
on reschedules
for insert
with check (
    exists (
        select 1
        from bookings
        where bookings.id = reschedules.booking_id
        and bookings.user_id = auth.uid()
    )
);