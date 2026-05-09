import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useTrafficTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log in production or if not local
    // But since it's an applet, let's just log unconditionally
    const logVisit = async () => {
      try {
        await addDoc(collection(db, 'visits'), {
          path: location.pathname,
          timestamp: serverTimestamp()
        });
      } catch (err) {
        // Silently fail if something goes wrong with traffic logging
        // We don't want to break the user experience
        console.error('Traffic logging failed', err);
      }
    };

    logVisit();
  }, [location.pathname]);
};
