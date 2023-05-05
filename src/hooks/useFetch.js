import { useCallback, useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(url);

      if (!response.ok) throw new Error('Request Fail');

      const data = await response.json();

      return data;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    fetchData,
  };
};

export { useFetch };
