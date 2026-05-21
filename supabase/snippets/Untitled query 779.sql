alter publication supabase_realtime add table seats;

select *
from pg_publication_tables
where pubname = 'supabase_realtime';