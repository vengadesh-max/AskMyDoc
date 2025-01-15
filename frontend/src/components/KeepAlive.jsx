import { useEffect } from 'react';

const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

function KeepAlive() {
  useEffect(() => {
    const pingServer = async () => {
      try {
        await fetch('https://querypdf.onrender.com/api/ping');
        console.log('Ping successful');
      } catch (error) {
        console.error('Ping failed:', error);
      }
    };

    const intervalId = setInterval(pingServer, PING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default KeepAlive;
