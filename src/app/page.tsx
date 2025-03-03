'use client';

import { useEffect, useState } from 'react';
import { fetchBranchQueueStatus, bookQueueNumber, cancelQueue, checkUserQueue } from '@/lib/supabaseApi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Add icons for status

interface Branch {
  id: string;
  name: string;
  currentNumber: number;
  queuing: number;
  crowdStatus: string;
  isFull: boolean;
}

const HomePage = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userQueue, setUserQueue] = useState<string | null>(null);  // New state to track user's current queue

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

  useEffect(() => {
    // Fetch the user's current queue when the component mounts
    const fetchUserQueue = async () => {
      // Replace with actual user ID (this is an example)
      const userId = "some-unique-user-id"; 
      const existingQueue = await checkUserQueue(userId);
      setUserQueue(existingQueue);
    };
    fetchUserQueue();
  }, []);

  const handleTakeNumber = async (branchId: string) => {
    try {
      // Replace with actual user ID
      const userId = "some-unique-user-id";
      const queueNumber = await bookQueueNumber(branchId, userId);
      setUserQueue(queueNumber.toString());
      alert(`Your queue number is: ${queueNumber}`);
    } catch (error) {
      console.error('Error booking queue', error);
      alert('Error booking queue. Please try again later.');
    }
  };

  const handleCancelQueue = async () => {
    try {
      // Replace with actual user ID
      const userId = "some-unique-user-id";
      await cancelQueue(userId);
      setUserQueue(null);
      alert('Your queue has been canceled.');
    } catch (error) {
      console.error('Error canceling queue', error);
      alert('Error canceling queue. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-semibold text-center text-white mb-8">Available Branches</h1>

      {branches.length === 0 ? (
        <p className="text-lg text-center text-gray-300">No branches available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => {
            const numberWaiting = branch.queuing;
            const crowdStatus = numberWaiting >= 15 ? 'Crowded 🚨' : 'Not Crowded ✅';

            return (
              <div key={branch.id} className="bg-gray-800 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-white">{branch.name}</h2>
                <div className="mt-4 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Current Number:</span>
                    <span>{branch.currentNumber}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Number Waiting:</span>
                    <span>{numberWaiting}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Status:</span>
                    <span className={`${numberWaiting >= 15 ? 'text-red-500' : 'text-green-500'}`}>
                      {numberWaiting >= 15 ? <FaTimesCircle className="inline" /> : <FaCheckCircle className="inline" />}
                      {crowdStatus}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  {userQueue ? (
                    <button
                      onClick={handleCancelQueue}
                      className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                      Cancel Number
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTakeNumber(branch.id)}
                      disabled={branch.isFull}
                      className={`px-6 py-3 rounded-lg font-medium text-white transition duration-300 ease-in-out ${
                        branch.isFull
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                      }`}
                      aria-disabled={branch.isFull ? 'true' : 'false'}
                    >
                      {branch.isFull ? 'Fully Booked' : 'Take Number'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
