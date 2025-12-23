import React, { useState, useEffect, useRef } from 'react';

const API_URL = "API/sponser/sponser_premium.php";

const HospitalSponsors = () => {
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const scrollContainerRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  // Fetch sponsors data from API
  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to match component structure
        const transformedSponsors = data.data.map(sponsor => ({
          id: sponsor.id,
          name: sponsor.brand_name,
          logo: sponsor.logo ? `API/sponser/images/${sponsor.logo}` : null, // Adjust path as needed
          description: sponsor.description,
          website: sponsor.website,
          type: sponsor.sponsor_type,
          status: sponsor.status
        }));
        
        setSponsors(transformedSponsors);
      } else {
        setError(data.message || 'Failed to fetch sponsors');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sponsors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Fetch sponsors on component mount
  useEffect(() => {
    fetchSponsors();
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage && savedLanguage !== currentLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    };

    const interval = setInterval(handleLanguageChange, 1000);
    return () => clearInterval(interval);
  }, [currentLanguage]);

  // If loading, show loading state
  if (loading) {
    return (
      <section className="bg-white -mt-10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
            <div className="flex justify-center space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If error, hide the page
  if (error) {
    return null;
  }

  // If no sponsors, hide the page
  if (sponsors.length === 0) {
    return null;
  }

  // Duplicate the sponsors for seamless marquee loop
  // We duplicate enough times to ensure smooth animation
  const runningSponsors = [...sponsors];

  // Scroll handlers
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      
      // Pause animation while scrolling
      setIsAnimating(false);
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      // Resume animation after 3 seconds
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
      }, 3000);
    }
  };

  return (
    <section className="bg-white -mt-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-left md:text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {currentLanguage === "en"
                            ? "Our Partners"
                            : "ដៃគូរសហាការណ៏"}
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative py-2">
          {/* Left Scroll Button - Only show if more than 7 logos */}
          {sponsors.length > 7 && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:shadow-lg"
              title="Scroll left"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden"
          >
            {/* Running Track */}
            <div className={isAnimating ? "animate-marquee whitespace-nowrap flex items-center" : "whitespace-nowrap flex items-center"}>
              {runningSponsors.map((sponsor, index) => (
              sponsor.website ? (
                <a
                  key={`${sponsor.id}-${index}`}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center justify-center mx-4 px-2 py-2 rounded-xl transition-all hover:shadow-md min-w-[120px] cursor-pointer hover:scale-105"
                >
                  {/* Logo Image */}
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="h-12 w-full object-contain mb-2"
                  />
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">
                    {sponsor.name}
                  </span>
                  <div className="text-[10px] text-slate-400 text-center mt-1">
                   {sponsor.website}
                  </div>
                </a>
              ) : (
                <div
                  key={`${sponsor.id}-${index}`}
                  className="inline-flex flex-col items-center justify-center mx-4 px-2 py-2 rounded-xl transition-all min-w-[120px]"
                >
                  {/* Logo Image */}
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="h-12 w-full object-contain mb-2"
                  />
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">
                    {sponsor.name}
                  </span>
                  <div className="text-[10px] text-slate-400 text-center mt-1">
                   {sponsor.website}
                  </div>
                </div>
              )
            ))}
            </div>
          </div>

          {/* Right Scroll Button - Only show if more than 7 logos */}
          {sponsors.length > 7 && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:shadow-lg"
              title="Scroll right"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      {/* Add animation to CSS */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Custom scrollbar styling */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </section>
  );
};

export default HospitalSponsors;