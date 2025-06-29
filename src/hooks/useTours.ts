import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';

type Tour = Database['public']['Tables']['tours']['Row'];

export function useTours(destinationId?: string, category?: string) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, [destinationId, category]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tours')
        .select('*')
        .order('average_rating', { ascending: false });

      if (destinationId) {
        query = query.eq('destination_id', destinationId);
      }

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTours(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { tours, loading, error, refetch: fetchTours };
}