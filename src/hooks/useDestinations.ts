import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('average_rating', { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { destinations, loading, error, refetch: fetchDestinations };
}