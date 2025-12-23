import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = {};

  useEffect(() => {
    // Save scroll position when leaving a page
    return () => {
      scrollPositions[location.pathname] = window.scrollY;
    };
  }, [location.pathname]);

  useEffect(() => {
    // Restore scroll position or scroll to top for new pages
    const savedPosition = scrollPositions[location.pathname];
    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
};

export default useScrollRestoration;
