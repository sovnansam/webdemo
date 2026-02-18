import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion } from "framer-motion";
import ScrollToTopButton from "../../../contexts/scrollTop";

const API_URL = "API/departments/optamology/optamology_section10.php";

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/optamology/${imagePath}`;
};

const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font"
    : "font-sans english-font";
};

const getYouTubeEmbedUrl = (url) => {
  if (!url || url === "null" || url === "undefined") return null;
  if (url.includes("youtube.com/embed/")) return url;
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1]?.split("&")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }
  if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
    return `https://www.youtube.com/embed/${url}?rel=0`;
  }
  if (url.startsWith("http")) return url;
  return null;
};

const OphthalmologySection10 = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showStickyBack, setShowStickyBack] = useState(false);

  const fontClass = getFontClass(currentLanguage);

  // --- SMART BACK NAVIGATION ---
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/ophthalmology");
    }
  };

  // --- SCROLL TO TOP ON LOAD ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll visibility for the sticky back button and scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setShowStickyBack(true);
      } else {
        setShowStickyBack(false);
      }

      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const content = {
    en: {
      backButton: "Back",
      features: "Service Features",
      video: "Video",
      gallery: "Image Gallery",
      error: "Service not found",
      errorMessage: "We couldn't find this service.",
    },
    km: {
      backButton: "ត្រឡប់ក្រោយ",
      features: "លក្ខណៈពិសេសនៃសេវាកម្ម",
      video: "វីដេអូ",
      gallery: "រូបភាព",
      error: "មិនឃើញសេវាកម្ម",
      errorMessage: "យើងមិនបានរកឃើញសេវាកម្មនេះ។",
    },
  };

  const langContent = content[currentLanguage] || content.en;

  useEffect(() => {
    if (currentLanguage === "km") {
      document.body.style.fontFamily =
        "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = "plaintext";
    } else {
      document.body.style.fontFamily = "";
      document.body.style.unicodeBidi = "";
    }
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.unicodeBidi = "";
    };
  }, [currentLanguage]);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const servicesData = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        const foundService = servicesData[0];

        if (!foundService) throw new Error("Service not found");
        setService(foundService);

        let galleryURLs = [getImageUrl(foundService.image_path)];
        if (foundService.images && Array.isArray(foundService.images)) {
          const imageUrls = foundService.images.map((img) =>
            getImageUrl(img.image_path)
          );
          galleryURLs = [...galleryURLs, ...imageUrls];
        }

        setGalleryImages(galleryURLs);
        setError(null);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2 className={`text-xl font-bold text-gray-900 mb-4 ${fontClass}`}>
            {langContent.error}
          </h2>
          <p className={`text-gray-600 mb-8 ${fontClass}`}>
            {langContent.errorMessage}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl cursor-pointer ${fontClass}`}
          >
            {langContent.backButton}
          </motion.button>
        </div>
      </div>
    );
  }

  const title =
    service[currentLanguage === "en" ? "title_en" : "title"] || service.title;
  const subTitle =
    service[currentLanguage === "en" ? "subTitle_en" : "subTitle"] ||
    service.subTitle;
  const paragraph =
    service[currentLanguage === "en" ? "paragraph_en" : "paragraph"] ||
    service.paragraph;
  const imageUrl = getImageUrl(service.image_path);
  const youtubeUrl = getYouTubeEmbedUrl(service.youtube_url);

  const allDescriptions = [
    paragraph,
    service[currentLanguage === "en" ? "paragraph1_en" : "paragraph1"],
    service[currentLanguage === "en" ? "paragraph2_en" : "paragraph2"],
    service[currentLanguage === "en" ? "paragraph3_en" : "paragraph3"],
    service[currentLanguage === "en" ? "paragraph4_en" : "paragraph4"],
    service[currentLanguage === "en" ? "paragraph5_en" : "paragraph5"],
    service[currentLanguage === "en" ? "paragraph6_en" : "paragraph6"],
  ].filter((desc) => desc && desc.trim().length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      >
        {/* Sticky Back Button - Modern Design */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: showStickyBack ? 0 : -100,
            opacity: showStickyBack ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className={`fixed w-full top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-lg ${
            showStickyBack ? "block" : "hidden"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <motion.button
                whileHover={{
                  x: -3,
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBack}
                className={`group flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-blue-100 bg-white/80 shadow-sm hover:shadow-md ${fontClass}`}
              >
                <motion.div
                  animate={{ x: [0, -2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </motion.div>
                <span className="text-blue-700 group-hover:text-blue-800 font-semibold text-base">
                  {langContent.backButton}
                </span>
              
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 md:mt-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={itemVariants}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              {service.category && (
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full uppercase mb-4 ${fontClass}`}
                >
                  {service.category}
                </span>
              )}
              <h1
                className={`text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 ${fontClass}`}
              >
                {title}
              </h1>
              <p
                className={`text-lg text-gray-700 font-semibold mb-6 ${fontClass}`}
              >
                {subTitle}
              </p>
              <p
                className={`text-base text-gray-600 leading-relaxed ${fontClass}`}
              >
                {paragraph}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery Section - All Images Displayed */}
        {galleryImages.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2
              className={`text-2xl font-extrabold text-gray-900 mb-8 ${fontClass}`}
            >
              {langContent.gallery}
            </h2>

            {/* Grid of all gallery images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative group"
                >
                  <div className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={img}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">
                          {title} - {index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Image number badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image count indicator */}
            <div className="mt-8 text-center">
              <p
                className={`text-gray-600 ${fontClass} inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full`}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {galleryImages.length}{" "}
                  {currentLanguage === "en" ? "images" : "រូបភាព"}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Video Section */}
        {youtubeUrl && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2
              className={`text-2xl font-extrabold text-gray-900 mb-8 ${fontClass}`}
            >
              {langContent.video}
            </h2>
            <div
              className="rounded-3xl overflow-hidden shadow-2xl relative"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={youtubeUrl}
                title={title}
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Features Section */}
        {allDescriptions.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2
              className={`text-2xl font-extrabold text-gray-900 mb-8 ${fontClass}`}
            >
              {langContent.features}
            </h2>
            <div className="space-y-6">
              {allDescriptions.map((desc, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className={`text-gray-700 leading-relaxed ${fontClass}`}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default OphthalmologySection10;
