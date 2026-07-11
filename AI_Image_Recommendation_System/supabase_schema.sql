create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        avatar_url = excluded.avatar_url;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.recommendation_searches (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  uploaded_image text,
  recommendations jsonb,
  model_used text,
  created_at timestamptz not null default now()
);

alter table public.recommendation_searches add column if not exists uploaded_image text;
alter table public.recommendation_searches add column if not exists recommendations jsonb;
alter table public.recommendation_searches add column if not exists model_used text;
alter table public.recommendation_searches enable row level security;

drop policy if exists "Users can read their own searches" on public.recommendation_searches;
create policy "Users can read their own searches"
on public.recommendation_searches for select
using (auth.uid() = user_id);

drop policy if exists "Users can create their own searches" on public.recommendation_searches;
create policy "Users can create their own searches"
on public.recommendation_searches for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own searches" on public.recommendation_searches;
create policy "Users can update their own searches"
on public.recommendation_searches for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own searches" on public.recommendation_searches;
create policy "Users can delete their own searches"
on public.recommendation_searches for delete
using (auth.uid() = user_id);

create table if not exists public.favorites (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  product_name text,
  image_path text,
  similarity_score float,
  created_at timestamptz not null default now()
);

alter table public.favorites enable row level security;

drop policy if exists "Users manage favorites" on public.favorites;
create policy "Users manage favorites"
on public.favorites for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  recommendation_id bigint references public.recommendation_searches(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

drop policy if exists "Users manage feedback" on public.feedback;
create policy "Users manage feedback"
on public.feedback for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
