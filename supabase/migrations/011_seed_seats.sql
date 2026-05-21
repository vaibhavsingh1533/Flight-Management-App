do $$
declare
    flight_record record;
    row_num integer;
    seat_letter text;
    seat_class text;
    seat_fee numeric;
begin
    for flight_record in
        select id from flights
    loop
        for row_num in 1..30
        loop
            if row_num <= 2 then
                seat_class := 'first';
                seat_fee := 4000;
            elsif row_num <= 8 then
                seat_class := 'business';
                seat_fee := 2000;
            else
                seat_class := 'economy';
                seat_fee := 0;
            end if;

            foreach seat_letter in array array['A', 'B', 'C', 'D', 'E', 'F']
            loop
                insert into seats (
                    flight_id,
                    seat_number,
                    class,
                    is_available,
                    extra_fee
                )
                values (
                    flight_record.id,
                    row_num || seat_letter,
                    seat_class,
                    true,
                    seat_fee
                );
            end loop;
        end loop;
    end loop;
end $$;