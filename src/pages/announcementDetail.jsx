import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = "/API/announcement/ALL_Announcement_web.php";

const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-40  
        w-10 h-10 p-0 rounded-full
        text-white 
        bg-gradient-to-br from-blue-500 to-indigo-600 
        shadow-xl shadow-blue-500/60
        transition-all duration-300 transform 
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 invisible'}
        hover:scale-110 hover:shadow-2xl hover:shadow-blue-600/70
        focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer
      `}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [isVisible, setIsVisible] = useState(false);


  // Apply Khmer font on component mount
  useEffect(() => {
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

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listener for language changes
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

  // Add scroll event listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Fetch announcement data
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("API returned non-JSON response:", text.substring(0, 200));
          throw new Error("API returned HTML instead of JSON. Please check the API endpoint.");
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

        // Find the announcement with matching ID
        const foundAnnouncement = announcementsArray.find(ann => {
          const annId = ann.id || `announcement-${announcementsArray.indexOf(ann)}`;
          return annId.toString() === id;
        });

        if (foundAnnouncement) {
          setAnnouncement({
            ...foundAnnouncement,
            id: foundAnnouncement.id || `announcement-${announcementsArray.indexOf(foundAnnouncement)}`
          });
        } else {
          setError("Announcement not found");
        }
      } catch (err) {
        console.error("Error fetching announcement:", err);
        setError("Failed to load announcement from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);



  const getTitle = (announcement) => {
    return currentLanguage === "en"
      ? announcement.title_en || announcement.title || "No Title"
      : announcement.title || announcement.title_en || "គ្មានចំណងជើង";
  };

  const getDescription = (announcement) => {
    const desc =
      currentLanguage === "en"
        ? announcement.subTitle_en ||
          announcement.subTitle ||
          "No description available"
        : announcement.subTitle ||
          announcement.subTitle_en ||
          "គ្មានការពិពណ៌នា";

    return desc;
  };

  const getMergedParagraphs = (announcement) => {
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
  };

  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath) {
      // Fallback image URL
      return "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
    }


    if (imagePath.startsWith("http")) {
      return imagePath;
    }


    const cleanPath = imagePath.replace(/^[\.\/]+/, "");
    

    if (!cleanPath) {
      return "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
    }

    // Check if it's already an absolute path (starts with /)
    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    // For relative paths, assume they're in the public directory
    const finalUrl = `/${cleanPath}`;
    console.log('Image URL generated:', { original: imagePath, final: finalUrl });
    return finalUrl;
  }, []);


  const formatDate = (dateString) => {
    if (!dateString)
      return currentLanguage === "en" ? "No date" : "គ្មានកាលបរិច្ឆេទ";

    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      if (currentLanguage === "en") {
        return date.toLocaleDateString("en-US", options);
      } else {
        return date.toLocaleDateString("km-KH", options);
      }
    } catch (error) {
      console.error("Date parsing error:", error, dateString);
      return dateString;
    }
  };

  const getTypeText = (announcement) => {
    const title = getTitle(announcement).toLowerCase();

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
  };

  const getTypeColor = (type) => {
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
  };


  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <div className="w-4 h-4 bg-blue-200 rounded-full animate-pulse"></div>
              {currentLanguage === "en" ? "Loading..." : "កំពុងផ្ទុក..."}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6 md:p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !announcement) {
    return (
      <section className="min-h-screen py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              ? "Announcement not found"
              : "រកមិនឃើញសេចក្តីជូនដំណឹង"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {error || (currentLanguage === "en" 
              ? "The announcement you're looking for doesn't exist."
              : "សេចក្តីជូនដំណឹងដែលអ្នកកំពុងស្វែងរកមិនមានទេ។")}
          </p>
          <Link
            to="/announcement"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {currentLanguage === "en" ? "Back to Announcements" : "ត្រឡប់ទៅសេចក្តីជូនដំណឹង"}
          </Link>
        </div>
      </section>
    );
  }

  const typeInfo = getTypeText(announcement);
  const colors = getTypeColor(typeInfo.en.toLowerCase());

  return (
    <>
      <div className="min-h-screen mt-10 md:mt-15 bg-slate-50" style={{ fontFamily: "'Battambang', 'Khmer OS', system-ui, sans-serif" }}>
        <section className="mt-10 md:mt-15 min-h-screen bg-gray-50/50 py-12 text-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                    {currentLanguage === "en" ? "Home" : "ទំព័រដើម"}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link to="/announcement" className="text-gray-500 hover:text-gray-700 transition-colors">
                    {currentLanguage === "en" ? "Announcements" : "សេចក្តីជូនដំណឹង"}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {getTitle(announcement).substring(0, 30)}...
                </li>
              </ol>
            </nav>

            {/* Announcement Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header with Type and Date */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex flex-wrap items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                    {typeInfo[currentLanguage]}
                  </span>
                  <span className="inline-flex text-sm text-yellow-600 font-medium px-3 py-1 rounded-full border border-gray-200">
                    {formatDate(announcement.created_at || announcement.date)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="px-6 pt-2 pb-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  {getTitle(announcement)}
                </h1>
              </div>

           

              {/* Image */}
              {announcement.image_path && (
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 p-4">
                    <img
                      src={getImageUrl(announcement.image_path)}
                      className="max-h-96 w-auto object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Load+Error";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="px-6 pt-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {getDescription(announcement)}
                </p>
              </div>

          {/* Full Content */}
              {getMergedParagraphs(announcement) && (
                <div className="px-6 pt-6">
                  <div className="prose prose-lg prose-gray max-w-none">
                    {getMergedParagraphs(announcement)
                      .split("\n\n")
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="mb-6 text-gray-700 leading-relaxed break-words hyphens-auto"
                          style={{ 
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            hyphens: 'auto'
                          }}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="px-6 py-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <Link
                    to="/announcement"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    {currentLanguage === "en" ? "Back" : "ត្រឡប់ក្រោយ"}
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default AnnouncementDetail;
