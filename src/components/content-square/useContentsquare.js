import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useContentsquareTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window._uxa = window._uxa || [];
    
    window._uxa.push(['trackPageview', location.pathname + location.search]);
  }, [location]);
};

export default useContentsquareTracking;