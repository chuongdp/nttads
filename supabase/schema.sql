-- Run this script in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt_text jsonb not null default '{}'::jsonb,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_interested text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.roi_calculations (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  budget numeric not null check (budget >= 0),
  expected_cpc numeric not null check (expected_cpc > 0),
  conversion_rate numeric not null check (conversion_rate >= 0 and conversion_rate <= 100),
  estimated_clicks numeric not null check (estimated_clicks >= 0),
  estimated_leads numeric not null check (estimated_leads >= 0),
  estimated_cpl numeric not null check (estimated_cpl >= 0),
  created_at timestamptz not null default now()
);

-- Optional indexes
create index if not exists leads_status_idx on public.leads (status);
create index if not exists services_slug_idx on public.services (slug);
create index if not exists roi_calculations_created_at_idx on public.roi_calculations (created_at desc);

-- Optional RLS starter policies (tighten later for production)
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.media enable row level security;
alter table public.leads enable row level security;
alter table public.roi_calculations enable row level security;

-- Public read for website content tables
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);

-- Allow authenticated admin/editor users to manage settings.
-- In production, replace this with role checks (e.g. profiles.role = 'admin').
drop policy if exists "auth manage settings" on public.site_settings;
create policy "auth manage settings" on public.site_settings
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (true);

drop policy if exists "public read media" on public.media;
create policy "public read media" on public.media for select using (true);

-- Allow anonymous lead submissions
drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads" on public.leads
for insert
to anon
with check (true);

-- Allow anonymous users to submit ROI calculations from website tool
drop policy if exists "anon insert roi calculations" on public.roi_calculations;
create policy "anon insert roi calculations" on public.roi_calculations
for insert
to anon
with check (true);

-- Allow authenticated admins/editors to read ROI analytics in dashboard
drop policy if exists "auth read roi calculations" on public.roi_calculations;
create policy "auth read roi calculations" on public.roi_calculations
for select
to authenticated
using (true);
