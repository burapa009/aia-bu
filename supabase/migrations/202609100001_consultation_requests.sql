begin;

create table public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  phone text not null check (phone ~ '^0[1-9][0-9]{7,8}$'),
  interest text not null check (interest in ('ดูแลครอบครัว', 'ค่ารักษาพยาบาล', 'ออมเงิน', 'เกษียณ', 'วางแผนค่าเรียนบุตร', 'AIA 20PAY LIFE (NON PAR)', 'ขอคำแนะนำเบื้องต้น')),
  message text not null default '' check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
create index consultation_requests_phone_created_idx on public.consultation_requests (phone, created_at desc);
alter table public.consultation_requests enable row level security;
revoke all on public.consultation_requests from anon, authenticated;
grant select, insert on public.consultation_requests to service_role;

-- Atomic phone-based cooldown works across multiple server instances.
-- ponytail: limits repeat submissions per phone, not distributed spam; add host WAF limits if abused.
create function public.submit_consultation(p_name text, p_phone text, p_interest text, p_message text)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_phone, 0));
  if exists (
    select 1 from public.consultation_requests
    where phone = p_phone and created_at > now() - interval '10 minutes'
  ) then
    raise exception 'consultation_cooldown' using errcode = 'P0001';
  end if;
  insert into public.consultation_requests (name, phone, interest, message)
  values (btrim(p_name), p_phone, p_interest, btrim(p_message));
end;
$$;
revoke all on function public.submit_consultation(text, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_consultation(text, text, text, text) to service_role;

commit;
