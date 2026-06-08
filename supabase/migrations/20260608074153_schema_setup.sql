-- Enable UUID generation extension if not exists
create extension if not exists "uuid-ossp";

-- 1. profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('customer', 'chef')),
  name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Allow public read profiles" on public.profiles
  for select to public
  using (true);

create policy "Allow owners update profiles" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Trigger to create profile when auth.users is created
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql as $$
begin
  insert into public.profiles (id, name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'User'),
    new.phone,
    null
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. chefs table
create table public.chefs (
  id uuid primary key references public.profiles(id) on delete cascade,
  kitchen_name text not null,
  bio text not null,
  is_verified boolean default false not null,
  trust_score numeric(3,2) default 5.00 check (trust_score >= 1.00 and trust_score <= 5.00) not null,
  latitude numeric(9,6) not null,
  longitude numeric(9,6) not null,
  radius_limit numeric(4,2) default 3.00 not null, -- in km
  operating_days text[] default '{}'::text[] not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for chefs
alter table public.chefs enable row level security;

-- Policies for chefs
create policy "Allow public read chefs" on public.chefs
  for select to public
  using (true);

create policy "Allow chefs insert own details" on public.chefs
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "Allow chefs update own details" on public.chefs
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);


-- 3. menus table
create table public.menus (
  id uuid primary key default gen_random_uuid(),
  chef_id uuid references public.chefs(id) on delete cascade not null,
  name text not null,
  description text not null,
  price integer check (price > 0) not null, -- in PKR
  dietary_tags text[] default '{}'::text[] not null,
  image_url text,
  created_at timestamptz default now() not null
);

-- Enable RLS for menus
alter table public.menus enable row level security;

-- Policies for menus
create policy "Allow public read menus" on public.menus
  for select to public
  using (true);

create policy "Allow chefs insert own menus" on public.menus
  for insert to authenticated
  with check (
    chef_id = (select auth.uid())
    and (select role from public.profiles where id = (select auth.uid())) = 'chef'
  );

create policy "Allow chefs update own menus" on public.menus
  for update to authenticated
  using (chef_id = (select auth.uid()))
  with check (chef_id = (select auth.uid()));

create policy "Allow chefs delete own menus" on public.menus
  for delete to authenticated
  using (chef_id = (select auth.uid()));


-- 4. subscriptions table
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  chef_id uuid references public.chefs(id) on delete cascade not null,
  plan_type text check (plan_type in ('5-day', '7-day')) not null,
  time_slot text check (time_slot in ('lunch', 'dinner')) not null,
  delivery_address text not null,
  status text default 'active' check (status in ('active', 'paused', 'cancelled')) not null,
  created_at timestamptz default now() not null
);

-- Enable RLS for subscriptions
alter table public.subscriptions enable row level security;

-- Policies for subscriptions
create policy "Allow customers/chefs select subscriptions" on public.subscriptions
  for select to authenticated
  using (
    (select auth.uid()) = customer_id 
    or (select auth.uid()) = chef_id
  );

create policy "Allow customers insert subscriptions" on public.subscriptions
  for insert to authenticated
  with check (
    (select auth.uid()) = customer_id
    and (select role from public.profiles where id = (select auth.uid())) = 'customer'
  );

create policy "Allow customers/chefs update subscriptions" on public.subscriptions
  for update to authenticated
  using (
    (select auth.uid()) = customer_id 
    or (select auth.uid()) = chef_id
  )
  with check (
    (select auth.uid()) = customer_id 
    or (select auth.uid()) = chef_id
  );


-- 5. orders table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  chef_id uuid references public.chefs(id) on delete cascade not null,
  subscription_id uuid references public.subscriptions(id) on delete cascade,
  delivery_date date not null,
  status text default 'preparing' check (status in ('preparing', 'ready', 'out_for_delivery', 'delivered', 'paused')) not null,
  rider_name text,
  rider_phone text,
  delivery_notes text,
  updated_at timestamptz default now() not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Policies for orders
create policy "Allow customers/chefs select orders" on public.orders
  for select to authenticated
  using (
    (select auth.uid()) = customer_id 
    or (select auth.uid()) = chef_id
  );

create policy "Allow customers insert orders" on public.orders
  for insert to authenticated
  with check (
    (select auth.uid()) = customer_id
    and (select role from public.profiles where id = (select auth.uid())) = 'customer'
  );

create policy "Allow chefs update orders" on public.orders
  for update to authenticated
  using ((select auth.uid()) = chef_id)
  with check ((select auth.uid()) = chef_id);


-- 6. reviews table
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  chef_id uuid references public.chefs(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamptz default now() not null
);

-- Enable RLS for reviews
alter table public.reviews enable row level security;

-- Policies for reviews
create policy "Allow public read reviews" on public.reviews
  for select to public
  using (true);

create policy "Allow subscribed customers insert reviews" on public.reviews
  for insert to authenticated
  with check (
    (select auth.uid()) = customer_id
    and exists (
      select 1 from public.subscriptions 
      where customer_id = (select auth.uid()) 
        and chef_id = reviews.chef_id
    )
  );
