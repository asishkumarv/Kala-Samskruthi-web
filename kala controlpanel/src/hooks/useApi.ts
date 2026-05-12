
import { useState, useEffect } from 'react';

export const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kala-samskruthi-web.onrender.com/api' + endpoint)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading };
};
