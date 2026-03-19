-- Endtimez Community App Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  avatar_url text,
  bio text,
  role text default 'user' check (role in ('user', 'admin')),
  total_support numeric default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. Messages Table (Realtime Chat)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  channel text not null default 'general',
  user_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  media_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;
create policy "Messages are viewable by everyone." on messages for select using (true);
create policy "Authenticated users can insert messages." on messages for insert with check (auth.role() = 'authenticated');

-- 3. Music Catalog Table
create table public.music_catalog (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text not null check (type in ('Album', 'Single')),
  price numeric not null,
  cover_url text,
  preview_url text,
  is_new boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.music_catalog enable row level security;
create policy "Catalog viewable by everyone." on music_catalog for select using (true);

-- 4. Calendar Events Table
create table public.calendar_events (
  id uuid default uuid_generate_v4() primary key,
  event_date date not null,
  title text not null,
  description text,
  media_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.calendar_events enable row level security;
create policy "Events viewable by everyone." on calendar_events for select using (true);
create policy "Only admins can modify events." on calendar_events for all using (
  exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  )
);

-- Note: To create an admin, first sign up a user, then manually change their role to 'admin' in the SQL dashboard:
-- UPDATE profiles SET role = 'admin' WHERE username = 'YourUsername';
