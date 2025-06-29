import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Some features may not work.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          date_of_birth: string | null;
          nationality: string | null;
          passport_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          nationality?: string | null;
          passport_number?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          nationality?: string | null;
          passport_number?: string | null;
        };
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          country: string;
          city: string;
          description: string | null;
          image_url: string | null;
          latitude: number | null;
          longitude: number | null;
          average_rating: number;
          total_reviews: number;
          popular_months: string[] | null;
          created_at: string;
          updated_at: string;
        };
      };
      hotels: {
        Row: {
          id: string;
          name: string;
          destination_id: string | null;
          address: string;
          city: string;
          country: string;
          description: string | null;
          image_urls: string[] | null;
          star_rating: number | null;
          average_rating: number;
          total_reviews: number;
          price_per_night: number;
          currency: string;
          amenities: string[] | null;
          room_types: string[] | null;
          latitude: number | null;
          longitude: number | null;
          check_in_time: string;
          check_out_time: string;
          created_at: string;
          updated_at: string;
        };
      };
      tours: {
        Row: {
          id: string;
          title: string;
          destination_id: string | null;
          description: string | null;
          image_urls: string[] | null;
          duration_hours: number;
          max_participants: number;
          price_per_person: number;
          currency: string;
          difficulty_level: string;
          category: string;
          includes: string[] | null;
          excludes: string[] | null;
          meeting_point: string | null;
          average_rating: number;
          total_reviews: number;
          available_dates: string[] | null;
          guide_name: string | null;
          guide_languages: string[] | null;
          created_at: string;
          updated_at: string;
        };
      };
      flights: {
        Row: {
          id: string;
          airline: string;
          flight_number: string;
          departure_airport: string;
          arrival_airport: string;
          departure_city: string;
          arrival_city: string;
          departure_time: string;
          arrival_time: string;
          duration_minutes: number;
          price: number;
          currency: string;
          available_seats: number;
          aircraft_type: string | null;
          class_type: string;
          created_at: string;
          updated_at: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          booking_type: string;
          status: string;
          flight_id: string | null;
          flight_passengers: any | null;
          hotel_id: string | null;
          check_in_date: string | null;
          check_out_date: string | null;
          room_type: string | null;
          guests_count: number | null;
          tour_id: string | null;
          tour_date: string | null;
          participants_count: number | null;
          participant_details: any | null;
          total_amount: number;
          currency: string;
          payment_status: string;
          payment_method: string | null;
          booking_reference: string | null;
          special_requests: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}