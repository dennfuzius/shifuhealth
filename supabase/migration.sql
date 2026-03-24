-- ========================================
-- ShifuHealth Supabase Migration
-- Run this in Supabase SQL Editor
-- ========================================

-- 1. Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  preferred_locale text check (preferred_locale in ('de', 'en')) default 'de',
  birth_year integer,
  gender text check (gender in ('male', 'female', 'other') or gender is null),
  health_goals text[] default '{}',
  dietary_preferences text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Favorites table
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_slug text not null,
  article_title_de text,
  article_title_en text,
  article_image_url text,
  category_title_de text,
  category_title_en text,
  created_at timestamptz default now(),
  unique(user_id, article_slug)
);

create index idx_favorites_user on public.favorites(user_id);
create index idx_favorites_slug on public.favorites(article_slug);

-- 4. Row Level Security
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Favorites policies
create policy "Users can view own favorites"
  on favorites for select using (auth.uid() = user_id);
create policy "Users can insert own favorites"
  on favorites for insert with check (auth.uid() = user_id);
create policy "Users can delete own favorites"
  on favorites for delete using (auth.uid() = user_id);

-- 5. Auto-update updated_at on profiles
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();
