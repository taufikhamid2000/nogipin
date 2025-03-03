import { useEffect, useState } from 'react';
import { fetchBranchQueueStatus } from '@/lib/supabaseApi'; // Import your API function

interface Branch {
  id: string;
  name: string;
  currentNumber: number;
  queuing: number;
  crowdStatus: string;
  isFull: boolean;
}

const useBranchQueueStatus = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBranchQueueStatus = async () => {
      try {
        const data = await fetchBranchQueueStatus();
        if (!data || data.length === 0) {
          setError('No branches found');
        }
        setBranches(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching branch queue status', error);
        setError('Failed to load branches. Please try again later.');
        setLoading(false);
      }
    };

    getBranchQueueStatus();
  }, []);

  return { branches, loading, error };
};

export default useBranchQueueStatus;
