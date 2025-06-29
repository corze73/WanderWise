import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';

type Hotel = Database['public']['Tables']['hotels']['Row'];

export function useHotels(destinationId?: string) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, [destinationId]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('hotels')
        .select('*')
        .order('average_rating', { ascending: false });

      if (destinationId) {
        query = query.eq('destination_id', destinationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHotels(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { hotels, loading, error, refetch: fetchHotels };
}