import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';

type Flight = Database['public']['Tables']['flights']['Row'];

interface FlightSearchParams {
  departureCity?: string;
  arrivalCity?: string;
  departureDate?: string;
  classType?: string;
}

export function useFlights(searchParams?: FlightSearchParams) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFlights();
  }, [searchParams]);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true });

      if (searchParams?.departureCity) {
        query = query.eq('departure_city', searchParams.departureCity);
      }

      if (searchParams?.arrivalCity) {
        query = query.eq('arrival_city', searchParams.arrivalCity);
      }

      if (searchParams?.classType) {
        query = query.eq('class_type', searchParams.classType);
      }

      if (searchParams?.departureDate) {
        const startDate = new Date(searchParams.departureDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        
        query = query
          .gte('departure_time', startDate.toISOString())
          .lt('departure_time', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setFlights(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { flights, loading, error, refetch: fetchFlights };
}