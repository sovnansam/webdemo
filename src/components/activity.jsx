import React, { useState, useEffect, useRef,useCallback } from 'react';

const API_BASE_URL = "API/activities/";
const API_URLS = {
  rcp: "activity_RCP.php",
  grandvisit: "activity_GrandVisit.php",
  activity: "activity_Activity.php"
};

const ActivityRCP = ({ currentLanguage = "km" }) => {
  const [activities, setActivities] = useState({
    rcp: null,
    grandvisit: null,
    activity: null
  });
  const [loading, setLoading] = useState({
    rcp: true,
    grandvisit: true,
    activity: true
  });
  const [errors, setErrors] = useState({
    rcp: null,
    grandvisit: null,
    activity: null
  });
  const [fullImage, setFullImage] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Refs for card elements
  const cardRefs = useRef([]);

  useEffect(() => {
    fetchAllActivities();
  }, []);

  const fetchAllActivities = async () => {
    const types = ['rcp', 'grandvisit', 'activity'];
    
    types.forEach(async (type) => {
      try {
        setLoading(prev => ({ ...prev, [type]: true }));
        setErrors(prev => ({ ...prev, [type]: null }));
        
        const response = await fetch(`${API_BASE_URL}${API_URLS[type]}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the response format
        let activityData = null;
        
        if (data.success && data.data) {
          activityData = data.data;
        } else if (data.success && data.data === null) {
          activityData = null;
        } else {
          throw new Error(data.message || `Failed to fetch ${type} activity`);
        }
        
    
        setActivities(prev => ({ ...prev, [type]: activityData }));
      } catch (err) {
        console.error(`Error fetching ${type} activity:`, err);
        setErrors(prev => ({ ...prev, [type]: err.message || `Failed to load ${type} activity` }));
      } finally {
        setLoading(prev => ({ ...prev, [type]: false }));
      }
    });
  };

  // Function to show full image on click
  const handleImageClick = (imageUrl, activity) => {
    setFullImage({
      url: imageUrl,
      title: getTitle(activity),
      description: getSubTitle(activity)
    });
    setShowFullImage(true);
  };

  const closeFullImage = () => {
    setShowFullImage(false);
    setFullImage(null);
  };

  // Toggle card expansion with focus management
  const toggleCardExpansion = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
    
    setTimeout(() => {
      const cardElement = cardRefs.current[index];
      if (cardElement) {
        cardElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        
        cardElement.focus({ preventScroll: true });
        cardElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        
        setTimeout(() => {
          cardElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 1500);
      }
    }, 100);
  };

  // Close full image on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showFullImage) {
        closeFullImage();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showFullImage]);

  const getTypeColor = (type) => {
    const colors = {
      rcp: { 
        bg: "bg-blue-100", 
        text: "text-blue-800", 
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-700",
        label: { en: "RCP", km: "RCP" }
      },
      grandvisit: { 
        bg: "bg-violet-100", 
        text: "text-violet-800", 
        border: "border-violet-200",
        gradient: "from-violet-500 to-violet-700",
        label: { en: "GrandVisit", km: "ទស្សនកិច្ច" }
      },
      activity: { 
        bg: "bg-emerald-100", 
        text: "text-emerald-800", 
        border: "border-emerald-200",
        gradient: "from-emerald-500 to-emerald-700",
        label: { en: "Activity", km: "សកម្មភាព" }
      }
    };
    return colors[type] || colors.rcp;
  };

const formatDate = useCallback(
  (dateString) => {
    if (!dateString) {
      return currentLanguage === "en" ? "No date" : "គ្មានកាលបរិច្ឆេទ";
    }

    try {
      const date = new Date(dateString);
      
      if (currentLanguage === "en") {
        return date.toLocaleDateString("en-US", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        });
      } else {
        // Manual Khmer date formatting
        const khmerMonths = [
          "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
          "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
        ];
        
        const khmerNumerals = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
        
        const year = date.getFullYear();
        const month = khmerMonths[date.getMonth()];
        const day = date.getDate();
        
        // Convert numbers to Khmer numerals
        const toKhmerNum = (num) => {
          return num.toString().split('').map(digit => khmerNumerals[digit] || digit).join('');
        };
        
        return `${toKhmerNum(day)} ${month} ${toKhmerNum(year)}`;
      }
    } catch (error) {
      console.error("Date parsing error:", error, dateString);
      return dateString;
    }
  },
  [currentLanguage]
);


  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "null" || imagePath === "undefined") {
      return "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
    }
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/")) return imagePath.substring(1);
    return `API/activities/${imagePath}`;
  };

  const getTitle = (activity) => {
    if (!activity) return currentLanguage === "en" ? "No Title" : "គ្មានចំណងជើង";
    return currentLanguage === "en" 
      ? activity.title_en || activity.title || "No Title"
      : activity.title || activity.title_en || "គ្មានចំណងជើង";
  };

  const getSubTitle = (activity) => {
    if (!activity) return currentLanguage === "en" ? "No description available" : "គ្មានការពិពណ៌នា";
    return currentLanguage === "en"
      ? activity.subTitle_en || activity.subTitle || "No description available"
      : activity.subTitle || activity.subTitle_en || "គ្មានការពិពណ៌នា";
  };

  // Get all paragraphs content merged together
  const getMergedParagraphs = (activity) => {
    if (!activity) return "";
    
    const paragraphs = [];
    
    // First, check the main paragraph field
    const mainParagraph = currentLanguage === "en"
      ? activity.paragraph_en || activity.paragraph || ""
      : activity.paragraph || activity.paragraph_en || "";
    
    if (mainParagraph && mainParagraph.trim() !== '') {
      paragraphs.push(mainParagraph);
    }
    
    // Then check for paragraph1 to paragraph4 in both languages
    for (let i = 1; i <= 4; i++) {
      const paragraphKey = `paragraph${i}`;
      const paragraphKeyEn = `paragraph${i}_en`;
      
      const paragraphContent = currentLanguage === "en" 
        ? activity[paragraphKeyEn] || activity[paragraphKey]
        : activity[paragraphKey] || activity[paragraphKeyEn];
      
      if (paragraphContent && paragraphContent.trim() !== '') {
        paragraphs.push(paragraphContent);
      }
    }
    
    // Merge all paragraphs with double line breaks for spacing
    return paragraphs.join('\n\n');
  };

  // Check if activity has additional paragraph content
  const hasAdditionalContent = (activity) => {
    if (!activity) return false;
    const mergedParagraphs = getMergedParagraphs(activity);
    return mergedParagraphs.length > 0;
  };

  // Check if any activity is loading
  const isLoading = loading.rcp || loading.grandvisit || loading.activity;

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <div className="w-4 h-4 bg-blue-200 rounded-full animate-pulse"></div>
              {currentLanguage === "en" ? "Loading Activities..." : "កំពុងផ្ទុកសកម្មភាព..."}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Activity data array for rendering
  const activityTypes = [
     { key: 'activity', label: 'Activity' },
    { key: 'grandvisit', label: 'GrandVisit' },
   
    { key: 'rcp', label: 'RCP' }
  ];

  return (
    <>
      <section className="py-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent p-5">
              {currentLanguage === "en" ? "Latest Activities" : "សកម្មភាពថ្មីៗ"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === "en" 
                ? "Discover our latest RCP initiatives, Grand Visits, and Activities"
                : "ស្វែងយល់ពីគំរោង RCP ទស្សនកិច្ចក្រុម និងសកម្មភាពថ្មីៗរបស់យើង"}
            </p>
          </div>

          {/* Three Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {activityTypes.map((type, index) => {
              const activity = activities[type.key];
              const error = errors[type.key];
              const typeColor = getTypeColor(type.key);
              const isExpanded = expandedCard === index;
              const hasMoreContent = hasAdditionalContent(activity);
              const mergedParagraphs = getMergedParagraphs(activity);
              const images = activity?.images || [];
              const mainImage = activity?.image_path || (images.length > 0 ? images[0]?.image_path : null);

              // Render error state for this card
              if (error) {
                return (
                  <div 
                    key={type.key}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {typeColor.label[currentLanguage]}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{error}</p>
                    <button
                      onClick={() => {
                        const types = { rcp: 'rcp', grandvisit: 'grandvisit', activity: 'activity' };
                        setLoading(prev => ({ ...prev, [type.key]: true }));
                        setErrors(prev => ({ ...prev, [type.key]: null }));
                        fetch(`${API_BASE_URL}${API_URLS[type.key]}`)
                          .then(response => response.json())
                          .then(data => {
                            if (data.success && data.data) {
                              setActivities(prev => ({ ...prev, [type.key]: data.data }));
                            }
                          })
                          .catch(err => {
                            setErrors(prev => ({ ...prev, [type.key]: err.message }));
                          })
                          .finally(() => {
                            setLoading(prev => ({ ...prev, [type.key]: false }));
                          });
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      {currentLanguage === "en" ? "Retry" : "ព្យាយាមម្ដងទៀត"}
                    </button>
                  </div>
                );
              }

              // Render empty state for this card
              if (!activity) {
                return (
                  <div 
                    key={type.key}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {typeColor.label[currentLanguage]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentLanguage === "en" 
                        ? `No ${type.label} activity available`
                        : `មិនទាន់មានសកម្មភាព ${type.label}`}
                    </p>
                  </div>
                );
              }

              // Render activity card
              return (
                <div
                  key={activity.id || type.key}
                  ref={el => cardRefs.current[index] = el}
                  tabIndex={-1}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-${type.key === 'rcp' ? 'blue' : type.key === 'grandvisit' ? 'violet' : 'emerald'}-200 transform hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    isExpanded ? 'lg:col-span-3' : ''
                  }`}
                >
                  {/* Image with click functionality */}
                  <div 
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(getImageUrl(mainImage), activity)}
                  >
                    <img
                      src={getImageUrl(mainImage)}
                      alt={getTitle(activity)}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        isExpanded ? 'h-96' : 'h-60'
                      }`}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                      }}
                    />
                    
                    {/* Click to view indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {currentLanguage === "en" ? "Click to view" : "ចុចដើម្បីមើល"}
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${typeColor.bg} ${typeColor.text} ${typeColor.border} border`}>
                        {typeColor.label[currentLanguage]}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 mr-1 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(activity.created_at)}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {getTitle(activity)}
                    </h3>
                    
                    {/* SubTitle Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {getSubTitle(activity)}
                    </p>

                    {/* Additional Content - Merged Paragraphs (when expanded) */}
                    {isExpanded && hasMoreContent && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {mergedParagraphs}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Read More / Show Less Button */}
                    {hasMoreContent && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpansion(index);
                        }}
                        className={`mt-4 bg-blue-600 hover:bg-blue-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer w-full`}
                      >
                        {isExpanded 
                          ? (currentLanguage === "en" ? "Show Less" : "បង្ហាញតិច") 
                          : (currentLanguage === "en" ? "Read More" : "អានបន្ថែម")
                        }
                        <svg 
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : 'group-hover:translate-x-1'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
<div className="mt-12 text-center">
            <button
              onClick={() => {
                window.location.href = "/activity";
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow hover:shadow-md"
            >
              {currentLanguage === "en" ? "View All Activities" : "មើលសកម្មភាពទាំងអស់"}
            </button>
              </div>

        </div>
      </section>

      {/* Full Image Overlay */}
      {showFullImage && fullImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeFullImage}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            onClick={closeFullImage}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullImage.url}
              alt={fullImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold mb-2">
                {fullImage.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {fullImage.description}
              </p>
            </div>
          </div>

          {/* Close Instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
            {currentLanguage === "en" 
              ? "Click anywhere or press ESC to close" 
              : "ចុចទីណាក៏បាន ឬចុច ESC ដើម្បីបិទ"}
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityRCP;