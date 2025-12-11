import React, { useState, useEffect, useRef, useCallback } from "react";

// NOTE: The API_URL is assumed to be accessible from this environment.
// For local testing, this URL might need to be adjusted or proxied.
const API_URL = "API/announcement/ALL_Announcement_web.php";

// Renamed from Announcement to App for default export structure
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NEW: State for pagination/show more
  const [visibleCount, setVisibleCount] = useState(6);
  const itemsPerLoad = 4; // Load 4 more items each time

  // State for image modal
  const [fullImage, setFullImage] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);

  const [expandedCard, setExpandedCard] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");

  // Refs for card elements, initialized to an empty array
  const cardRefs = useRef([]);

  // Apply Khmer font on component mount
  useEffect(() => {
    // Apply Battambang font for both Khmer and English
    document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
    
    if (currentLanguage === 'km') {
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      document.body.style.unicodeBidi = '';
    }

    return () => {
      // Optional: cleanup if needed
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
      // Use subTitle for the main description
      const desc =
        currentLanguage === "en"
          ? announcement.subTitle_en ||
            announcement.subTitle ||
            "No description available"
          : announcement.subTitle ||
            announcement.subTitle_en ||
            "គ្មានការពិពណ៌នា";

      return desc;
    },
    [currentLanguage]
  );

  // Get all paragraphs content merged together
  const getMergedParagraphs = useCallback(
    (announcement) => {
      const paragraphs = [];

      // First, check the main paragraph field
      const mainParagraph =
        currentLanguage === "en"
          ? announcement.paragraph_en || announcement.paragraph
          : announcement.paragraph || announcement.paragraph_en;

      if (mainParagraph && mainParagraph.trim() !== "") {
        paragraphs.push(mainParagraph);
      }

      // Then check for paragraph1 to paragraph4 in both languages
      for (let i = 1; i <= 4; i++) {
        const paragraphKey = `paragraph${i}`;
        const paragraphKeyEn = `paragraph${i}_en`;

        const paragraphContent =
          currentLanguage === "en"
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

  // Check if announcement has additional paragraph content
  const hasAdditionalContent = useCallback(
    (announcement) => {
      const mergedParagraphs = getMergedParagraphs(announcement);
      return mergedParagraphs.length > 0;
    },
    [getMergedParagraphs]
  );

  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath) {
      // Fallback image URL
      return "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
    }

    // Handle relative paths by cleaning them up, assuming they are relative to the root/API
    if (imagePath.startsWith("http")) {
      return imagePath;
    } else {
      // Clean path, assumes image is accessible via a direct path if not starting with http
      const cleanPath = imagePath.replace(/^[\.\/]+/, "").replace(/^\//i, "");
      return cleanPath.length > 0
        ? cleanPath
        : "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
    }
  }, []);

  const formatDate = useCallback(
    (dateString) => {
      if (!dateString)
        return currentLanguage === "en" ? "No date" : "គ្មានកាលបរិច្ឆេទ";

      try {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        if (currentLanguage === "en") {
          return date.toLocaleDateString("en-US", options);
        } else {
          // Use the correct locale for Khmer
          return date.toLocaleDateString("km-KH", options);
        }
      } catch (error) {
        // Log error for debugging but return original string
        console.error("Date parsing error:", error, dateString);
        return dateString;
      }
    },
    [currentLanguage]
  );

  const getTypeText = useCallback(
    (announcement) => {
      // Determine type based on content or use default
      const title = getTitle(announcement).toLowerCase();

      // Simplified logic for type determination
      if (
        title.includes("holiday") ||
        title.includes("closed") ||
        title.includes("ថ្ងៃឈប់សម្រាក")
      ) {
        return { en: "Holiday", km: "ថ្ងៃឈប់សម្រាក" };
      } else if (
        title.includes("update") ||
        title.includes("new") ||
        title.includes("អាប់ដេត")
      ) {
        return { en: "Update", km: "ការអាប់ដេត" };
      } else if (
        title.includes("emergency") ||
        title.includes("important") ||
        title.includes("សំខាន់")
      ) {
        return { en: "Important", km: "សំខាន់" };
      }
      return { en: "News", km: "ព័ត៌មាន" };
    },
    [getTitle]
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
    return colors[type?.toLowerCase()] || colors.default;
  }, []);

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
          // If the API returns a single object that looks like an announcement
          announcementsArray = [data];
        }
      }

      // Ensure that 'id' exists for React keys, using index as fallback
      const processedAnnouncements = announcementsArray.map((ann, index) => ({
        ...ann,
        id: ann.id || `announcement-${index}`,
      }));

      setAnnouncements(processedAnnouncements);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Initialize refs array based on announcements length
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, announcements.length);
  }, [announcements]);

  // --- Language Management ---

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listener for language changes (from other components/tabs)
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

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "km" : "en";
    setCurrentLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  // --- NEW: Show More Functionality ---
  const handleShowMore = () => {
    setVisibleCount(prevCount => {
      const newCount = prevCount + itemsPerLoad;
      // Don't exceed total announcements length
      return Math.min(newCount, announcements.length);
    });
  };

  const handleShowLess = () => {
    setVisibleCount(6); // Reset to initial 4 items
  };

  // Get visible announcements based on visibleCount
  const visibleAnnouncements = announcements.slice(0, visibleCount);
  const hasMoreToShow = visibleCount < announcements.length;
  const isShowingMoreThanInitial = visibleCount > 6;

  // --- Interaction Handlers ---

  // Function to show full image on click
  const handleImageClick = (announcement) => {
    const imageUrl = getImageUrl(announcement.image_path);
    setFullImage({
      url: imageUrl,
      title: getTitle(announcement),
      description: getDescription(announcement),
    });
    setShowFullImage(true);
  };

  const closeFullImage = () => {
    setShowFullImage(false);
    setFullImage(null);
  };

  // Toggle card expansion with smooth scroll
  const toggleCardExpansion = (index) => {
    const wasExpanded = expandedCard === index;
    setExpandedCard(wasExpanded ? null : index);

    // Scroll to the card if expanded
    if (!wasExpanded) {
      setTimeout(() => {
        cardRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  };

  // Close full image on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showFullImage) {
        closeFullImage();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showFullImage]);

  // --- Rendering Functions (JSX) ---

  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
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
      <section className="min-h-screen py-20 bg-white">
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
            {currentLanguage === "en"
              ? "Failed to load announcements"
              : "មិនអាចផ្ទុកសេចក្តីជូនដំណឹងបាន"}
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
    <div className="min-h-screen mt-10 -mb-10 lg:mt-15 bg-slate-50" style={{ fontFamily: "'Battambang', 'Khmer OS', system-ui, sans-serif" }}>
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
                {currentLanguage === "en"
                  ? "No announcements yet"
                  : "មិនមានសេចក្តីជូនដំណឹង"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {currentLanguage === "en"
                  ? "Check back later for new updates and announcements."
                  : "សូមត្រលប់មកវិញនៅពេលក្រោយសម្រាប់ព័ត៌មានថ្មីៗ និងសេចក្តីជូនដំណឹង។"}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {visibleAnnouncements.map((announcement, index) => {
                  const typeInfo = getTypeText(announcement);
                  const colors = getTypeColor(typeInfo.en.toLowerCase());
                  const isExpanded = expandedCard === index;

                  return (
                    <div
                      key={announcement.id}
                      ref={(el) => (cardRefs.current[index] = el)}
                      className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl ${
                        isExpanded ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                      }`}
                      tabIndex={0}
                    >
                      <div className="lg:flex cursor-pointer">
                        {/* Image Section (lg:w-1/3 for smaller image) */}
                        <div className="flex items-center justify-center rounded-xl overflow-hidden p-2">
                          <img
                            onClick={() => handleImageClick(announcement)}
                            src={getImageUrl(announcement.image_path)}
                            className="max-h-50 w-auto object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Load+Error";
                            }}
                          />
                        </div>

                        {/* Content Section (lg:w-2/3) */}
                        <div className="lg:w-2/3 p-2 md:p-8 flex flex-col justify-between">
                          <div className="flex flex-col h-full">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
                              {getTitle(announcement)}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                              {getDescription(announcement)}
                            </p>

                            {/* Additional Content (Expanded - with smooth transition) */}
                            {hasAdditionalContent(announcement) && (
                              <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                  isExpanded
                                    ? "max-h-[1000px] opacity-100 mb-6"
                                    : "max-h-0 opacity-0 mb-0"
                                }`}
                              >
                                <div className="pt-4 border-t border-gray-50">
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

                            {/* Footer with expand/collapse button and view image button */}
                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 ">
                              {hasAdditionalContent(announcement) && (
                                <button
                                  onClick={() => toggleCardExpansion(index)}
                                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 "
                                >
                                  {isExpanded ? (
                                    <>
                                      <svg
                                        className="w-4 h-4 mr-2 "
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
                                      {currentLanguage === "en"
                                        ? "Show Less"
                                        : "បង្ហាញតិច"}
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
                                      {currentLanguage === "en"
                                        ? "Read More"
                                        : "អានបន្ថែម"}
                                    </>
                                  )}
                                </button>
                              )}

                              <span className="inline-flex text-sm text-yellow-600 md:inline-flex text-sm text-yellow-600 lg:inline-flex text-sm text-yellow-600 font-medium px-3 py-1 rounded-full border border-gray-200 select-none">
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

              {/* Show More/Less Buttons */}
              {announcements.length > 6 && (
                <div className="mt-12 text-center">
                  {hasMoreToShow ? (
                    <button
                      onClick={handleShowMore}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
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
                      {currentLanguage === "en" 
                        ? `Show ${itemsPerLoad} More` 
                        : `បង្ហាញបន្ថែម ${itemsPerLoad}`
                      }
                      {` (${announcements.length - visibleCount} ${currentLanguage === "en" ? "remaining" : "នៅសល់"})`}
                    </button>
                  ) : (
                    <div className="space-x-4">
                      <button
                        onClick={handleShowLess}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
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
                      </button>
                      <span className="text-gray-600 text-sm">
                        {currentLanguage === "en" 
                          ? "Showing all announcements" 
                          : "បង្ហាញសេចក្តីជូនដំណឹងទាំងអស់"
                        }
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Full Image Modal */}
      {showFullImage && fullImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={closeFullImage}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            <button
              onClick={closeFullImage}
              className="absolute top-4 right-4 bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white transition-all duration-200 z-10 "
              aria-label="Close image viewer"
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
              className="w-full h-auto max-h-[70vh] object-contain rounded-t-2xl"
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
              <p className="text-gray-600">{fullImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;