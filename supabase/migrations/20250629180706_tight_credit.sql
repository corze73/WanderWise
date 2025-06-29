/*
  # Travel Booking Platform Database Schema

  1. New Tables
    - `profiles` - User profile information extending Supabase auth
    - `destinations` - Available travel destinations
    - `flights` - Flight search results and bookings
    - `hotels` - Hotel listings and bookings
    - `tours` - Tour packages and bookings
    - `bookings` - Main booking records
    - `reviews` - User reviews for destinations, hotels, tours
    - `saved_searches` - User's saved search preferences
    - `user_preferences` - User travel preferences and settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for destinations, hotels, tours
    - Private access for bookings, reviews, preferences

  3. Features
    - Full booking management system
    - Review and rating system
    - User preference tracking
    - Search history and saved searches
*/

-- Create profiles table extending auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  phone text,
  date_of_birth date,
  nationality text,
  passport_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  description text,
  image_url text,
  latitude decimal(10,8),
  longitude decimal(11,8),
  average_rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  popular_months text[], -- Array of month names
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create flights table
CREATE TABLE IF NOT EXISTS flights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  airline text NOT NULL,
  flight_number text NOT NULL,
  departure_airport text NOT NULL,
  arrival_airport text NOT NULL,
  departure_city text NOT NULL,
  arrival_city text NOT NULL,
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  duration_minutes integer NOT NULL,
  price decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  available_seats integer DEFAULT 0,
  aircraft_type text,
  class_type text DEFAULT 'economy', -- economy, premium_economy, business, first
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  address text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  description text,
  image_urls text[], -- Array of image URLs
  star_rating integer CHECK (star_rating >= 1 AND star_rating <= 5),
  average_rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  price_per_night decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  amenities text[], -- Array of amenities
  room_types text[], -- Array of available room types
  latitude decimal(10,8),
  longitude decimal(11,8),
  check_in_time time DEFAULT '15:00',
  check_out_time time DEFAULT '11:00',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  description text,
  image_urls text[], -- Array of image URLs
  duration_hours integer NOT NULL,
  max_participants integer DEFAULT 20,
  price_per_person decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  difficulty_level text DEFAULT 'easy', -- easy, moderate, challenging
  category text NOT NULL, -- city_tour, adventure, cultural, food_drink, nature, photography, historical
  includes text[], -- What's included in the tour
  excludes text[], -- What's not included
  meeting_point text,
  average_rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  available_dates date[],
  guide_name text,
  guide_languages text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_type text NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'tour', 'package')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  
  -- Flight booking details
  flight_id uuid REFERENCES flights(id) ON DELETE SET NULL,
  flight_passengers jsonb, -- Array of passenger details
  
  -- Hotel booking details
  hotel_id uuid REFERENCES hotels(id) ON DELETE SET NULL,
  check_in_date date,
  check_out_date date,
  room_type text,
  guests_count integer,
  
  -- Tour booking details
  tour_id uuid REFERENCES tours(id) ON DELETE SET NULL,
  tour_date date,
  participants_count integer,
  participant_details jsonb, -- Array of participant info
  
  -- Common booking details
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method text,
  booking_reference text UNIQUE,
  special_requests text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  review_type text NOT NULL CHECK (review_type IN ('destination', 'hotel', 'tour', 'flight')),
  
  -- Reference IDs based on review type
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  tour_id uuid REFERENCES tours(id) ON DELETE CASCADE,
  flight_id uuid REFERENCES flights(id) ON DELETE CASCADE,
  
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  pros text[],
  cons text[],
  would_recommend boolean DEFAULT true,
  travel_date date,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved_searches table
CREATE TABLE IF NOT EXISTS saved_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  search_type text NOT NULL CHECK (search_type IN ('flight', 'hotel', 'tour')),
  search_params jsonb NOT NULL, -- Store search parameters as JSON
  name text, -- User-given name for the search
  alert_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  preferred_currency text DEFAULT 'USD',
  preferred_language text DEFAULT 'en',
  newsletter_subscribed boolean DEFAULT true,
  price_alerts boolean DEFAULT true,
  travel_style text[], -- adventure, luxury, budget, cultural, nature, etc.
  dietary_restrictions text[],
  accessibility_needs text[],
  preferred_airlines text[],
  preferred_hotel_chains text[],
  seat_preference text, -- window, aisle, no_preference
  room_preference text, -- single, double, suite, etc.
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Destinations policies (public read)
CREATE POLICY "Anyone can read destinations"
  ON destinations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Flights policies (public read)
CREATE POLICY "Anyone can read flights"
  ON flights
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Hotels policies (public read)
CREATE POLICY "Anyone can read hotels"
  ON hotels
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Tours policies (public read)
CREATE POLICY "Anyone can read tours"
  ON tours
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Bookings policies (private)
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can create own reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved searches policies (private)
CREATE POLICY "Users can manage own saved searches"
  ON saved_searches
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User preferences policies (private)
CREATE POLICY "Users can manage own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country);
CREATE INDEX IF NOT EXISTS idx_destinations_city ON destinations(city);
CREATE INDEX IF NOT EXISTS idx_flights_departure_airport ON flights(departure_airport);
CREATE INDEX IF NOT EXISTS idx_flights_arrival_airport ON flights(arrival_airport);
CREATE INDEX IF NOT EXISTS idx_flights_departure_time ON flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_hotels_destination_id ON hotels(destination_id);
CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city);
CREATE INDEX IF NOT EXISTS idx_tours_destination_id ON tours(destination_id);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flights_updated_at BEFORE UPDATE ON flights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();