import React, { useState, useEffect, useRef, useCallback } from "react";

const API_URL = "API/announcement/announcement_web.php";

const Announcement = ({ currentLanguage = "km" }) => { // Add language prop
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const cardRefs = useRef([]);
  const lastFullImageIdRef = useRef(null);

  // Apply Khmer font styles only for Khmer language
  useEffect(() => {
    if (currentLanguage === "km") {
      document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      document.body.style.fontFamily = '';
      document.body.style.unicodeBidi = '';
    }
    
    return () => {
      document.body.style.fontFamily = '';
      document.body.style.unicodeBidi = '';
    };
  }, [currentLanguage]);

  // --- Utility Functions ---
  const getTitle = useCallback(
    (announcement) => {
      return currentLanguage === "en" 
        ? announcement.title_en || announcement.title || "No Title"
        : announcement.title || announcement.title_en || "គ្មានចំណងជើង";
    },
    [currentLanguage]
  );

  const getDescription = useCallback(
    (announcement) => {
      return currentLanguage === "en"
        ? announcement.subTitle_en || announcement.subTitle || "No description available"
        : announcement.subTitle || announcement.subTitle_en || "គ្មានការពិពណ៌នា";
    },
    [currentLanguage]
  );

  const getMergedParagraphs = useCallback(
    (announcement) => {
      const paragraphs = [];

      // First, check the main paragraph field
      const mainParagraph = currentLanguage === "en"
        ? announcement.paragraph_en || announcement.paragraph
        : announcement.paragraph || announcement.paragraph_en;
      
      if (mainParagraph && mainParagraph.trim() !== "") {
        paragraphs.push(mainParagraph);
      }

      // Then check for paragraph1 to paragraph4 in both languages
      for (let i = 1; i <= 4; i++) {
        const paragraphKey = `paragraph${i}`;
        const paragraphKeyEn = `paragraph${i}_en`;

        const paragraphContent = currentLanguage === "en"
          ? announcement[paragraphKeyEn] || announcement[paragraphKey]
          : announcement[paragraphKey] || announcement[paragraphKeyEn];
        
        if (paragraphContent && paragraphContent.trim() !== "") {
          paragraphs.push(paragraphContent);
        }
      }

      // Merge all paragraphs with double line breaks for spacing
      return paragraphs.join("\n\n");
    },
    [currentLanguage]
  );

  const hasAdditionalContent = useCallback(
    (announcement) => {
      const mergedParagraphs = getMergedParagraphs(announcement);
      return mergedParagraphs.length > 0;
    },
    [getMergedParagraphs]
  );

  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath || imagePath.trim() === '') {
      return "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
    }

    // Check if it's already a valid URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    // Handle relative paths - prepend with base URL if needed
    // Remove any leading dots or slashes
    const cleanPath = imagePath.replace(/^[\.\/]+/, '');
    
    // Return as-is - the browser will handle relative paths from current location
    return cleanPath;
  }, []);

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

  const getTypeText = useCallback(
    (announcement) => {
      const title = getTitle(announcement).toLowerCase();

      if (currentLanguage === "en") {
        if (title.includes("holiday") || title.includes("closed")) {
          return "Holiday";
        } else if (title.includes("update") || title.includes("new")) {
          return "Update";
        } else if (title.includes("emergency") || title.includes("important")) {
          return "Important";
        }
        return "News";
      } else {
        if (
          title.includes("holiday") ||
          title.includes("closed") ||
          title.includes("ថ្ងៃឈប់សម្រាក")
        ) {
          return "ថ្ងៃឈប់សម្រាក";
        } else if (
          title.includes("update") ||
          title.includes("new") ||
          title.includes("អាប់ដេត")
        ) {
          return "ការអាប់ដេត";
        } else if (
          title.includes("emergency") ||
          title.includes("important") ||
          title.includes("សំខាន់")
        ) {
          return "សំខាន់";
        }
        return "សេចក្តីជូនដំណឹង";
      }
    },
    [currentLanguage, getTitle]
  );

  const getTypeColor = useCallback((type) => {
    const colors = {
      news: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      holiday: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        border: "border-orange-200",
      },
      update: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      important: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
      default: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      },
    };
    
    const typeMap = {
      "ព័ត៌មាន": "news",
      "ថ្ងៃឈប់សម្រាក": "holiday",
      "ការអាប់ដេត": "update",
      "សំខាន់": "important",
      "News": "news",
      "Holiday": "holiday",
      "Update": "update",
      "Important": "important"
    };
    
    return colors[typeMap[type]?.toLowerCase()] || colors.default;
  }, []);

  // Reset expanded card when language changes
  useEffect(() => {
    setExpandedCard(null);
  }, [currentLanguage]);

  // --- Fetching and Initial Setup ---
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let announcementsArray = [];

      if (data.data && Array.isArray(data.data)) {
        announcementsArray = data.data;
      } else if (Array.isArray(data)) {
        announcementsArray = data;
      } else if (data && typeof data === "object") {
        if (data.announcements && Array.isArray(data.announcements)) {
          announcementsArray = data.announcements;
        } else if (data.results && Array.isArray(data.results)) {
          announcementsArray = data.results;
        } else {
          announcementsArray = [data];
        }
      }

      const processedAnnouncements = announcementsArray.map((ann, index) => ({
        ...ann,
        id: ann.id || `announcement-${index}`,
      }));

      setAnnouncements(processedAnnouncements);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError(
        currentLanguage === "en" 
          ? "Cannot load announcements from API." 
          : "មិនអាចផ្ទុកសេចក្តីជូនដំណឹងពី API បាន។"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, announcements.length);
  }, [announcements]);

  // --- Interaction Handlers ---
  const handleImageClick = useCallback((announcement) => {
    const imageUrl = getImageUrl(announcement.image_path);
    const newFullImage = {
      url: imageUrl,
      title: getTitle(announcement),
      description: getDescription(announcement),
      announcementId: announcement.id
    };
    setFullImage(newFullImage);
    lastFullImageIdRef.current = announcement.id;
    setShowFullImage(true);
  }, [getImageUrl, getTitle, getDescription]);

  const closeFullImage = () => {
    setShowFullImage(false);
    setFullImage(null);
    lastFullImageIdRef.current = null;
  };

  const toggleCardExpansion = (index) => {
    const wasExpanded = expandedCard === index;
    setExpandedCard(wasExpanded ? null : index);

    if (!wasExpanded) {
      setTimeout(() => {
        cardRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showFullImage) {
        closeFullImage();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showFullImage]);

  // Update full image when language changes - FIXED VERSION
  useEffect(() => {
    if (showFullImage && lastFullImageIdRef.current) {
      const currentAnnouncement = announcements.find(ann => 
        ann.id === lastFullImageIdRef.current
      );
      
      if (currentAnnouncement) {
        const updatedFullImage = {
          url: getImageUrl(currentAnnouncement.image_path),
          title: getTitle(currentAnnouncement),
          description: getDescription(currentAnnouncement),
          announcementId: currentAnnouncement.id
        };
        
        // Only update if something actually changed
        if (
          updatedFullImage.title !== fullImage?.title ||
          updatedFullImage.description !== fullImage?.description
        ) {
          setFullImage(updatedFullImage);
        }
      }
    }
  }, [currentLanguage, announcements, showFullImage]); // Removed fullImage from dependencies

  // --- Rendering Functions (JSX) ---
  if (loading) {
    return (
      <section className="h-full py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <div className="w-4 h-4 bg-blue-200 rounded-full animate-pulse"></div>
              {currentLanguage === "en" ? "Loading..." : "កំពុងផ្ទុក..."}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {currentLanguage === "en" ? "Announcements" : "សេចក្តីជូនដំណឹង"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="lg:flex">
                  <div className="lg:w-1/3 w-full h-64 bg-gray-200"></div>
                  <div className="lg:w-2/3 p-6 md:p-8">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
                      <div className="h-5 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && announcements.length === 0) {
    return (
      <section className="h-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {currentLanguage === "en" ? "Failed to load announcements" : "មិនអាចផ្ទុកសេចក្តីជូនដំណឹងបាន"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchAnnouncements}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {currentLanguage === "en" ? "Try Again" : "ព្យាយាមម្តងទៀត"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="h-full bg-slate-50" style={{ 
      fontFamily: currentLanguage === "km" 
        ? "'Battambang', 'Khmer OS', system-ui, sans-serif" 
        : "system-ui, sans-serif" 
    }}>
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-1xl -mt-10 text-blue-600 text-shadow-lg md:text-3xl font-extrabold mb-2 text-blue-600">
              {currentLanguage === "en" ? "Announcements" : "សេចក្តីជូនដំណឹង"}
            </h2>
          </div>

          {announcements.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-200">
                <svg
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentLanguage === "en" ? "No announcements" : "មិនមានសេចក្តីជូនដំណឹង"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {currentLanguage === "en" 
                  ? "Please check back later for news and announcements."
                  : "សូមត្រលប់មកវិញនៅពេលក្រោយសម្រាប់ព័ត៌មានថ្មីៗ និងសេចក្តីជូនដំណឹង។"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {announcements.map((announcement, index) => {
                const typeText = getTypeText(announcement);
                const colors = getTypeColor(typeText);
                const isExpanded = expandedCard === index;
                const imageUrl = getImageUrl(announcement.image_path);

                return (
                  <div
                    key={announcement.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl ${
                      isExpanded ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                    }`}
                    tabIndex={0}
                  >
                    {/* Mobile: Stack, Tablet+: Side by side */}
                    <div className="md:flex">
                      {/* Image Section */}
                      <div className="md:w-60 flex items-center justify-center p-4">
                        <div 
                          className="w-full h-48 md:h-full rounded-xl overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50"
                          onClick={() => handleImageClick(announcement)}
                        >
                          <img
                            src={imageUrl}
                            alt={getTitle(announcement)}
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Load+Error";
                            }}
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-2/3 p-6 flex flex-col justify-between">
                        <div className="flex flex-col h-full">
                          {/* Type Badge */}
                          <div className="mb-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}>
                              {typeText}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-md font-bold text-gray-900 mb-3 leading-snug">
                            {getTitle(announcement)}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                            {getDescription(announcement)}
                          </p>

                          {/* Additional Content */}
                          {hasAdditionalContent(announcement) && (
                            <div
                              className={`text-sm transition-all duration-500 ease-in-out overflow-hidden ${
                                isExpanded
                                  ? "max-h-[1000px] opacity-100 mb-6"
                                  : "max-h-0 opacity-0 mb-0"
                              }`}
                            >
                              <div className="text-sm pt-4 border-t border-gray-100">
                                <div className="prose prose-sm prose-gray max-w-none">
                                  {getMergedParagraphs(announcement)
                                    .split("\n\n")
                                    .map((paragraph, idx) => (
                                      <p
                                        key={idx}
                                        className="mb-4 text-gray-700 leading-relaxed"
                                      >
                                        {paragraph}
                                      </p>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 cusror-pointer">
                            {hasAdditionalContent(announcement) && (
                              <button
                                onClick={() => toggleCardExpansion(index)}
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm cusror-pointer"
                              >
                                {isExpanded ? (
                                  <>
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 15l7-7 7 7"
                                      />
                                    </svg>
                                    {currentLanguage === "en" ? "Show Less" : "បង្ហាញតិច"}
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                    {currentLanguage === "en" ? "Read More" : "អានបន្ថែម"}
                                  </>
                                )}
                              </button>
                            )}

                            <span className="inline-flex text-sm text-blue-500 font-medium px-3 py-1 rounded-full border border-gray-700 select-none">
                              {formatDate(
                                announcement.created_at || announcement.date
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-12 text-center">
            <button
              onClick={() => {  
                window.location.href = "/announcement";
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow hover:shadow-md cursor-pointer"
            >
              {currentLanguage === "en" ? "View All Announcements" : "មើលសេចក្តីជូនដំណឹងទាំងអស់"}
            </button>
            </div>
        </div>
      </section>

      {/* Full Image Modal */}
      {showFullImage && fullImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeFullImage}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[800px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFullImage}
              className="absolute top-4 right-4 bg-gray-100 text-gray-800 rounded-full p-2 hover:bg-white transition-all duration-200 z-10"
              aria-label={currentLanguage === "en" ? "Close" : "បិទ"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={fullImage.url}
              alt={fullImage.title}
              className="w-full max-h-[600px] object-contain rounded-t-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x600/3b82f6/ffffff?text=Image+Unavailable";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {fullImage.title}
              </h3>
              <p className="text-gray-600">
                {fullImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;