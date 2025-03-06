import { useEffect, useState } from 'react';
import { supabase, testConnection } from '../lib/supabase';
import { Property } from '../lib/supabase';

export default function DatabaseTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const connected = await testConnection();
        setIsConnected(connected);

        if (connected) {
          // Try to fetch properties
          const { data, error } = await supabase
            .from('properties')
            .select('*');

          if (error) {
            throw error;
          }

          setProperties(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsConnected(false);
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Database Connection Test</h2>
      
      {/* Connection Status */}
      <div className="mb-4">
        <p className="font-semibold">Connection Status: </p>
        {isConnected === null ? (
          <span className="text-gray-500">Checking connection...</span>
        ) : isConnected ? (
          <span className="text-green-500">Connected successfully!</span>
        ) : (
          <span className="text-red-500">Connection failed</span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Properties List */}
      {properties.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Properties Found:</h3>
          <ul className="space-y-2">
            {properties.map((property) => (
              <li key={property.id} className="p-2 bg-gray-50 rounded">
                {property.title} - {property.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 