insert into flights (
    flight_no,
    origin,
    destination,
    departs_at,
    arrives_at,
    aircraft_type,
    status,
    base_price
)
values
(
    'AI201',
    'Mumbai',
    'Delhi',
    now() + interval '1 day',
    now() + interval '1 day 2 hours',
    'Airbus A320',
    'scheduled',
    4500
),
(
    'AI202',
    'Mumbai',
    'Delhi',
    now() + interval '2 days',
    now() + interval '2 days 2 hours',
    'Airbus A320',
    'scheduled',
    5200
),
(
    '6E301',
    'Delhi',
    'Bangalore',
    now() + interval '1 day',
    now() + interval '1 day 2 hours 30 minutes',
    'Boeing 737',
    'scheduled',
    4800
),
(
    '6E302',
    'Delhi',
    'Bangalore',
    now() + interval '3 days',
    now() + interval '3 days 2 hours 30 minutes',
    'Boeing 737',
    'scheduled',
    5500
),
(
    'UK401',
    'Bangalore',
    'Hyderabad',
    now() + interval '1 day',
    now() + interval '1 day 1 hour 15 minutes',
    'Airbus A321',
    'scheduled',
    3200
),
(
    'UK402',
    'Bangalore',
    'Hyderabad',
    now() + interval '2 days',
    now() + interval '2 days 1 hour 15 minutes',
    'Airbus A321',
    'scheduled',
    3700
),
(
    'SG501',
    'Hyderabad',
    'Mumbai',
    now() + interval '1 day',
    now() + interval '1 day 1 hour 45 minutes',
    'Boeing 737 MAX',
    'scheduled',
    4100
),
(
    'SG502',
    'Hyderabad',
    'Mumbai',
    now() + interval '4 days',
    now() + interval '4 days 1 hour 45 minutes',
    'Boeing 737 MAX',
    'scheduled',
    4600
);