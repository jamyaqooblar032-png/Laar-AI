-- Laar AI — initial schema
-- Run this in Supabase SQL editor:
-- https://supabase.com/dashboard/project/zntjtfmdbhrwmocsjzdx/sql

-- ============ WAITLIST ============
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tool_slug text,
  source text default 'coming-soon-card',
  created_at timestamptz default now(),
  unique (email, tool_slug)
);

create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists waitlist_tool_idx on public.waitlist (tool_slug);

alter table public.waitlist enable row level security;

drop policy if exists "anon insert" on public.waitlist;
create policy "anon insert"
  on public.waitlist for insert
  to anon
  with check (true);

drop policy if exists "service select" on public.waitlist;
create policy "service select"
  on public.waitlist for select
  to service_role
  using (true);

-- ============ USAGE TRACKING ============
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  ip text,
  user_id uuid,
  tool_slug text,
  tokens_in int default 0,
  tokens_out int default 0,
  created_at timestamptz default now()
);

create index if not exists usage_ip_idx on public.usage_events (ip, created_at desc);
create index if not exists usage_tool_idx on public.usage_events (tool_slug);
create index if not exists usage_user_idx on public.usage_events (user_id);

alter table public.usage_events enable row level security;

-- ============ AVATAR REQUESTS (Phase 2) ============
create table if not exists public.avatar_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  photo_url text,
  audio_url text,
  script text,
  voice_id text,
  tier text default 'free',
  status text default 'queued',
  result_url text,
  created_at timestamptz default now(),
  processed_at timestamptz
);

create index if not exists avatar_email_idx on public.avatar_requests (email);
create index if not exists avatar_status_idx on public.avatar_requests (status, created_at);

alter table public.avatar_requests enable row level security;
