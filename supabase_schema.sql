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

-- Trigger to automatically create a profile for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', new.email), null);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

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

-- 5. God Mode Features
create table public.app_bulletin (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.app_bulletin enable row level security;
create policy "Bulletin viewable by everyone." on app_bulletin for select using (true);
create policy "Only admins can modify bulletin." on app_bulletin for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create table public.app_videos (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  youtube_id text not null,
  views text default '0',
  category text check (category in ('recent', 'popular', 'premium')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.app_videos enable row level security;
create policy "Videos viewable by everyone." on app_videos for select using (true);
create policy "Only admins can modify videos." on app_videos for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 6. Codex Channels & Premium Roadmap
create table public.app_channels (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.app_channels enable row level security;
create policy "Channels viewable by everyone." on app_channels for select using (true);
create policy "Only admins can modify channels." on app_channels for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create table public.app_roadmap (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  status text default 'planned' check (status in ('soon', 'tba', 'live', 'planned')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.app_roadmap enable row level security;
create policy "Roadmap viewable by everyone." on app_roadmap for select using (true);
create policy "Only admins can modify roadmap." on app_roadmap for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
