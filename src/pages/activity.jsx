import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const API_URL = "API/activities/activity_web.php";

// ==========================================
// 1. UTILITIES
// ==========================================

const CATEGORIES = [
  { id: "all", label: { en: "All", km: "ទាំងអស់" } },
  { id: "activity", label: { en: "Activity", km: "សកម្មភាព" } },
  { id: "rcp", label: { en: "RCP", km: "RCP" } },
  { id: "grandvisit", label: { en: "GrandVisit", km: "ទស្សនកិច្ច" } },
];

const SORT_OPTIONS = [
  { id: "newest", label: { en: "Newest First", km: "ថ្មីបំផុតមកដំបូង" } },
  { id: "oldest", label: { en: "Oldest First", km: "ចាស់បំផុតមកដំបូង" } },
  { id: "title_asc", label: { en: "Title A-Z", km: "ឈ្មោះ ក-អ" } },
  { id: "title_desc", label: { en: "Title Z-A", km: "ឈ្មោះ អ-ក" } },
  {
    id: "recently_updated",
    label: { en: "Recently Updated", km: "ធ្វើបច្ចុប្បន្នភាពថ្មីៗ" },
  },
];

const CONTENT_TYPES = [
  { id: "all", label: { en: "All Types", km: "ប្រភេទទាំងអស់" } },
  { id: "with_video", label: { en: "With Video", km: "មានវីដេអូ" } },
  { id: "with_images", label: { en: "With Images", km: "មានរូបភាព" } },
  { id: "text_only", label: { en: "Text Only", km: "មាតិកាអក្សរតែប៉ុណ្ណោះ" } },
];

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/activities/${imagePath}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const getCategoryData = (sectionType) => {
  const key = sectionType?.toLowerCase();
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase";

  const categories = {
    rcp: {
      label: { en: "RCP", km: "RCP" },
      style: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    grandvisit: {
      label: { en: "GrandVisit", km: "ទស្សនកិច្ច" },
      style: "bg-violet-50 text-violet-600 border border-violet-100",
    },
    activity: {
      label: { en: "Activity", km: "សកម្មភាព" },
      style: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    default: {
      label: { en: "Unknown", km: "Unknown" },
      style: "bg-gray-50 text-gray-600 border border-gray-100",
    },
  };

  const data = categories[key] || categories.default;
  return { ...data, className: `${baseStyle} ${data.style}` };
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
    <div className="h-48 bg-gray-100 w-full animate-pulse"></div>
    <div className="p-6 flex-1 flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const ImageModal = ({ fullImage, closeFullImage }) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-300"
    onClick={closeFullImage}
  >
    <div className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center">
      <button
        onClick={closeFullImage}
        className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <img
        src={fullImage.url}
        alt={fullImage.title}
        className="w-full h-full object-contain rounded-lg shadow-2xl"
      />
      <p className="mt-4 text-white/90 font-medium text-lg tracking-wide">
        {fullImage.title}
      </p>
    </div>
  </div>
);

// Font utility function
const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font"
    : "font-battambang english-font";
};

// Consistent Image component with fixed dimensions
const ConsistentImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  objectFit = "cover",
}) => (
  <div className={`overflow-hidden ${containerClassName}`}>
    <img
      src={src}
      alt={alt}
      className={`w-full h-full ${
        objectFit === "cover" ? "object-cover" : "object-contain"
      } transition-all duration-500 ${className}`}
      loading="lazy"
      onError={(e) => {
        e.target.src =
          "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
      }}
    />
  </div>
);

const TopImageSection = ({
  blog,
  utils,
  activeImagePath,
  onGalleryClick,
  currentLanguage,
}) => {
  const fontClass = getFontClass(currentLanguage);

  return (
    <div className="mt-20 w-full border-b border-gray-100">
      {/* Main Hero Image - Fixed Size */}
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <ConsistentImage
            src={utils.getImageUrl(activeImagePath)}
            alt={utils.getTitle(blog)}
            objectFit="contain"
            containerClassName="w-full h-full"
          />
        </div>
      </div>

      {/* Gallery Strip - Fixed Size Thumbnails */}
      {blog.images && blog.images.length > 0 && (
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h4
              className={`text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ${fontClass}`}
            >
              {currentLanguage === "en" ? "Image Gallery" : "វិចិត្រសាល"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* Additional Image Thumbnails */}
              {blog.images.map((img, idx) => {
                const isActive = activeImagePath === img.image_path;
                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 ${
                      isActive ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => onGalleryClick(img.image_path)}
                  >
                    <ConsistentImage
                      src={utils.getImageUrl(img.image_path)}
                      alt={`Gallery ${idx + 1}`}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-110"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BottomVideoSection = ({ blog, utils, currentLanguage }) => {
  const videoUrl = utils.getYouTubeEmbedUrl(blog.youtube_url);
  const fontClass = getFontClass(currentLanguage);

  if (!videoUrl) return null;

  return (
    <div className="max-w-4xl mx-auto w-full px-6 pb-12 pt-8 border-t border-gray-100 mt-8">
      <h3
        className={`text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 ${fontClass}`}
      >
        <span className="w-10 h-1 bg-red-600 rounded-full"></span>
        {currentLanguage === "en" ? "Video Content" : "មាតិកាវីដេអូ"}
      </h3>
      <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allowFullScreen
          title="Video"
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. EXPANDED SECTION COMPONENT
// ==========================================

const ExpandedBlogSection = ({
  blog,
  currentLanguage,
  utils,
  onClose,
  onImageClick,
}) => {
  const { getTitle, getDescription, formatDate, getMergedParagraphs } = utils;
  const categoryData = getCategoryData(blog.section_type);
  const title = getTitle(blog);
  const content = getMergedParagraphs(blog);
  const fontClass = getFontClass(currentLanguage);

  const [activeHeaderImage, setActiveHeaderImage] = useState(blog.image_path);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Scroll to top when expanded section opens
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGallerySwap = (newImagePath) => {
    setActiveHeaderImage(newImagePath);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Close Button - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={onClose}
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 font-semibold border border-gray-200 cursor-pointer ${fontClass}`}
            >
              <svg
                className="w-5 h-5"
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
              {currentLanguage === "en"
                ? "Back to All Articles"
                : "ត្រលប់ទៅអត្ថបទទាំងអស់"}
            </button>

            <div className="flex items-center gap-3">
              <span className={`${categoryData.className} ${fontClass}`}>
                {currentLanguage === "en"
                  ? categoryData.label.en
                  : categoryData.label.km}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Images */}
      <TopImageSection
        blog={blog}
        utils={utils}
        activeImagePath={activeHeaderImage}
        onGalleryClick={handleGallerySwap}
        currentLanguage={currentLanguage}
      />

      {/* Text Content with Max Width */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className={`text-sm text-gray-400 font-medium ${fontClass}`}>
            {formatDate(blog.created_at)}
          </span>
        </div>

        <h1
          className={`text-lg md:text-3xl sm:text-lg font-extrabold text-gray-900 leading-tight mb-8 ${fontClass}`}
        >
          {title}
        </h1>

        <p
          className={`text-xl text-gray-600 font-medium leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 py-2 ${fontClass}`}
        >
          {getDescription(blog)}
        </p>

        <div
          className={`prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line ${fontClass}`}
        >
          {content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-8 text-lg leading-8 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* YouTube Video */}
      <BottomVideoSection
        blog={blog}
        utils={utils}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

// ==========================================
// 4. MAIN CARD COMPONENT (Grid View)
// ==========================================

const BlogCard = ({
  blog,
  index,
  currentLanguage,
  utils,
  onExpand,
  onImageClick,
}) => {
  const { getTitle, getDescription, formatDate, getImageUrl } = utils;
  const categoryData = getCategoryData(blog.section_type);
  const title = getTitle(blog);
  const fontClass = getFontClass(currentLanguage);

  // Check if blog has video or images
  const hasVideo = blog.youtube_url && blog.youtube_url.trim() !== "";
  const hasImages = blog.images && blog.images.length > 0;

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full ${fontClass}`}
      onClick={() => onExpand(index)}
    >
      {/* Card Image - Fixed Size */}
      <div className="relative h-48 w-full overflow-hidden">
        <ConsistentImage
          src={getImageUrl(blog.image_path)}
          alt={title}
          containerClassName="w-full h-full"
          className="group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`${categoryData.className} bg-white/90 backdrop-blur-sm shadow-sm ${fontClass}`}
          >
            {currentLanguage === "en"
              ? categoryData.label.en
              : categoryData.label.km}
          </span>
        </div>

        {/* Content Type Indicators */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {hasVideo && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Video
            </span>
          )}
          {hasImages && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              {blog.images.length}{" "}
              {blog.images.length === 1 ? "Image" : "Images"}
            </span>
          )}
        </div>
      </div>

      {/* Text Content with Consistent Padding */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3 text-xs text-blue-500 font-medium text-right">
          <span>{formatDate(blog.created_at)}</span>
        </div>
        <h3
          className={`text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 ${fontClass}`}
        >
          {title}
        </h3>
        <p
          className={`text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1 ${fontClass}`}
        >
          {getDescription(blog)}
        </p>
        <div
          className={`pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all ${fontClass}`}
        >
          {currentLanguage === "en" ? "Read Article" : "អានអត្ថបទ"}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const FilterControls = ({
  currentLanguage,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  sortBy,
  setSortBy,
  CATEGORIES,
  SORT_OPTIONS,
}) => {
  const fontClass = getFontClass(currentLanguage);

  return (
    <div className="mb-8 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
      {/* DESKTOP: Single Row Layout */}
      <div className="hidden md:flex items-center justify-between gap-6">
        {/* Left side: Scrollable Category Pills */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            {/* Category label */}
            <span
              className={`text-sm font-semibold text-gray-500 whitespace-nowrap ${fontClass}`}
            >
              {currentLanguage === "en" ? "Category:" : "ប្រភេទ៖"}
            </span>

            {/* Scrollable category pills */}
            <div className="relative flex-1">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center whitespace-nowrap flex-shrink-0 cursor-pointer ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    } ${fontClass}`}
                  >
                    <span className="relative z-10">
                      {currentLanguage === "en"
                        ? category.label.en
                        : category.label.km}
                    </span>
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold relative z-10 ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {categoryCounts[category.id] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Sort + Clear Filter */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span
              className={`text-sm text-gray-500 whitespace-nowrap ${fontClass}`}
            >
              {currentLanguage === "en" ? "Sort:" : "តម្រៀប៖"}
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer ${fontClass}`}
                style={{ minWidth: "140px", paddingRight: "2rem" }}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {currentLanguage === "en"
                      ? option.label.en
                      : option.label.km}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-700">
                <svg
                  className="w-3.5 h-3.5"
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
              </div>
            </div>
          </div>

          {/* Clear filter button */}
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer ${fontClass}`}
            >
              {currentLanguage === "en" ? "Clear filter" : "សម្អាត"}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE: Two Row Layout */}
      <div className="md:hidden space-y-4">
        {/* Row 1: Sort + Clear Filter */}
        <div className="flex items-center justify-between">
          {/* Sort dropdown */}
          <div className="flex items-center gap-3">
            <span className={`text-sm text-gray-500 ${fontClass}`}>
              {currentLanguage === "en" ? "Sort:" : "តម្រៀប៖"}
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer ${fontClass}`}
                style={{ minWidth: "160px", paddingRight: "2.5rem" }}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {currentLanguage === "en"
                      ? option.label.en
                      : option.label.km}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="w-4 h-4"
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
              </div>
            </div>
          </div>

          {/* Clear filter button */}
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors cursor-pointer ${fontClass}`}
            >
              {currentLanguage === "en" ? "Clear filter" : "សម្អាត"}
            </button>
          )}
        </div>

        {/* Row 2: Scrollable Category Pills */}
        <div className="relative group">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

          {/* Scrollable container */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center whitespace-nowrap flex-shrink-0 group/button cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 shadow-sm shadow-blue-100"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-95"
                } ${fontClass}`}
              >
                <span className="relative z-10">
                  {currentLanguage === "en"
                    ? category.label.en
                    : category.label.km}
                </span>
                <span
                  className={`ml-2 rounded-full px-2 py-1 text-xs font-semibold relative z-10 ${
                    selectedCategory === category.id
                      ? "bg-blue-200 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {categoryCounts[category.id] || 0}
                </span>

                {/* Active state indicator */}
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-blue-400/5"></div>
                )}
              </button>
            ))}
          </div>

          {/* Scroll hint for mobile */}
          <div className="flex justify-center mt-2">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              <span className={fontClass}>
                {currentLanguage === "en" ? "Scroll for more" : "រមូរសម្រាប់បន្ថែម"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. SHOW MORE BUTTON COMPONENT
// ==========================================

const ShowMoreButton = ({
  currentLanguage,
  visibleCount,
  totalCount,
  onClick,
  fontClass,
}) => {
  const remaining = totalCount - visibleCount;
  
  if (remaining <= 0) return null;

  return (
    <div className="col-span-full flex justify-center mt-8">
      <button
        onClick={onClick}
        className={`px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer ${fontClass}`}
      >
        <span>
          {currentLanguage === "en"
            ? `Show More (${remaining} more)`
            : `បង្ហាញបន្ថែម (${remaining})`}
        </span>
        <svg
          className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
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
      </button>
    </div>
  );
};

// ==========================================
// 6. MAIN PAGE COMPONENT
// ==========================================

const Activity = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [visibleCount, setVisibleCount] = useState(8); // Changed from 8 to 4
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Enhanced filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
    dateType: "created", // 'created' or 'updated'
  });
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Initialize utils with useMemo
  const utils = useMemo(
    () => ({
      getTitle: (b) => {
        if (currentLanguage === "km") {
          return b.title && b.title.trim() !== ""
            ? b.title
            : b.title_en || "No Title";
        } else {
          return b.title_en && b.title_en.trim() !== ""
            ? b.title_en
            : b.title || "No Title";
        }
      },

      getDescription: (b) => {
        if (currentLanguage === "km") {
          return b.subTitle && b.subTitle.trim() !== ""
            ? b.subTitle
            : b.subTitle_en || "";
        } else {
          return b.subTitle_en && b.subTitle_en.trim() !== ""
            ? b.subTitle_en
            : b.subTitle || "";
        }
      },

      getMergedParagraphs: (b) => {
        const paragraphs = [];

        if (currentLanguage === "km") {
          const mainPara =
            b.paragraph && b.paragraph.trim() !== ""
              ? b.paragraph
              : b.paragraph_en || "";
          if (mainPara) paragraphs.push(mainPara);

          for (let i = 1; i <= 4; i++) {
            const khmerPara = b[`paragraph${i}`];
            const englishPara = b[`paragraph${i}_en`];

            if (khmerPara && khmerPara.trim() !== "") {
              paragraphs.push(khmerPara);
            } else if (englishPara && englishPara.trim() !== "") {
              paragraphs.push(englishPara);
            }
          }
        } else {
          const mainPara =
            b.paragraph_en && b.paragraph_en.trim() !== ""
              ? b.paragraph_en
              : b.paragraph || "";
          if (mainPara) paragraphs.push(mainPara);

          for (let i = 1; i <= 4; i++) {
            const englishPara = b[`paragraph${i}_en`];
            const khmerPara = b[`paragraph${i}`];

            if (englishPara && englishPara.trim() !== "") {
              paragraphs.push(englishPara);
            } else if (khmerPara && khmerPara.trim() !== "") {
              paragraphs.push(khmerPara);
            }
          }
        }

        return paragraphs.join("\n\n");
      },

      formatDate: (dateString) => {
        if (!dateString) {
          return currentLanguage === "en" ? "No date" : "គ្មានកាលបរិច្ឆេទ";
        }

        try {
          const date = new Date(dateString);

          if (currentLanguage === "en") {
            return date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } else {
            const khmerMonths = [
              "មករា",
              "កុម្ភៈ",
              "មីនា",
              "មេសា",
              "ឧសភា",
              "មិថុនា",
              "កក្កដា",
              "សីហា",
              "កញ្ញា",
              "តុលា",
              "វិច្ឆិកា",
              "ធ្នូ",
            ];

            const khmerNumerals = [
              "០",
              "១",
              "២",
              "៣",
              "៤",
              "៥",
              "៦",
              "៧",
              "៨",
              "៩",
            ];

            const year = date.getFullYear();
            const month = khmerMonths[date.getMonth()];
            const day = date.getDate();

            const toKhmerNum = (num) => {
              return num
                .toString()
                .split("")
                .map((digit) => khmerNumerals[digit] || digit)
                .join("");
            };

            return `${toKhmerNum(day)} ${month} ${toKhmerNum(year)}`;
          }
        } catch (error) {
          console.error("Date parsing error:", error, dateString);
          return dateString;
        }
      },

      getImageUrl: (imagePath) => {
        return getImageUrl(imagePath);
      },

      getYouTubeEmbedUrl: (url) => {
        return getYouTubeEmbedUrl(url);
      },
    }),
    [currentLanguage]
  );

  // Enhanced filter and sort function
  const filterAndSortBlogs = useCallback(() => {
    if (!blogs.length) return [];

    let result = [...blogs];

    // A. SEARCH FILTER
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((blog) => {
        const title = utils.getTitle(blog).toLowerCase();
        const description = utils.getDescription(blog).toLowerCase();
        const content = utils.getMergedParagraphs(blog).toLowerCase();

        return (
          title.includes(query) ||
          description.includes(query) ||
          content.includes(query)
        );
      });
    }

    // B. CATEGORY FILTER
    if (selectedCategory !== "all") {
      result = result.filter(
        (blog) => blog.section_type?.toLowerCase() === selectedCategory
      );
    }

    // C. DATE RANGE FILTER
    if (dateFilter.startDate || dateFilter.endDate) {
      result = result.filter((blog) => {
        const dateField =
          dateFilter.dateType === "updated"
            ? blog.updated_at || blog.created_at
            : blog.created_at;

        if (!dateField) return true;

        const blogDate = new Date(dateField);
        blogDate.setHours(0, 0, 0, 0);

        let startDateValid = true;
        let endDateValid = true;

        if (dateFilter.startDate) {
          const startDate = new Date(dateFilter.startDate);
          startDate.setHours(0, 0, 0, 0);
          startDateValid = blogDate >= startDate;
        }

        if (dateFilter.endDate) {
          const endDate = new Date(dateFilter.endDate);
          endDate.setHours(23, 59, 59, 999);
          endDateValid = blogDate <= endDate;
        }

        return startDateValid && endDateValid;
      });
    }

    // D. CONTENT TYPE FILTER
    if (contentTypeFilter !== "all") {
      result = result.filter((blog) => {
        switch (contentTypeFilter) {
          case "with_video":
            return blog.youtube_url && blog.youtube_url.trim() !== "";
          case "with_images":
            return blog.images && blog.images.length > 0;
          case "text_only":
            return (
              (!blog.youtube_url || blog.youtube_url.trim() === "") &&
              (!blog.images || blog.images.length === 0)
            );
          default:
            return true;
        }
      });
    }

    // E. SORTING
    result.sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      const updatedDateA = new Date(a.updated_at || a.created_at || 0);
      const updatedDateB = new Date(b.updated_at || b.created_at || 0);
      const titleA = utils.getTitle(a).toLowerCase();
      const titleB = utils.getTitle(b).toLowerCase();

      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "title_asc":
          return titleA.localeCompare(titleB);
        case "title_desc":
          return titleB.localeCompare(titleA);
        case "recently_updated":
          return updatedDateB - updatedDateA;
        default:
          return dateB - dateA;
      }
    });

    return result;
  }, [
    blogs,
    searchQuery,
    selectedCategory,
    dateFilter,
    contentTypeFilter,
    sortBy,
    utils,
  ]);

  // Update filtered blogs
  useEffect(() => {
    const filtered = filterAndSortBlogs();
    setFilteredBlogs(filtered);
    setVisibleCount(8); // Reset to 4 when filters change
  }, [filterAndSortBlogs]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSearchQuery("");
    setDateFilter({
      startDate: "",
      endDate: "",
      dateType: "created",
    });
    setContentTypeFilter("all");
    setSortBy("newest");
    setIsFilterExpanded(false);
    setVisibleCount(8); // Reset to 4
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 600));
        const res = await fetch(API_URL);
        const json = await res.json();
        const data = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];
        const formattedData = data.map((b, i) => ({ ...b, uniqueId: i }));
        setBlogs(formattedData);
        setFilteredBlogs(formattedData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage") || "km";
    setCurrentLanguage(savedLanguage);
    applyLanguageStyles(savedLanguage);
  }, []);

  // Apply language-specific styles
  const applyLanguageStyles = (language) => {
    document.documentElement.classList.remove("language-en", "language-km");
    document.documentElement.classList.add(`language-${language}`);

    if (language === "km") {
      document.body.style.fontFamily =
        "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = "plaintext";
    } else {
      document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
      document.body.style.unicodeBidi = "";
    }
  };

  const handleExpand = useCallback((index) => {
    setExpandedCardIndex(index);
    document.body.style.overflow = "auto";
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedCardIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredBlogs.length));
  }, [filteredBlogs.length]);

  const fontClass = getFontClass(currentLanguage);

  // Count blogs by category
  const categoryCounts = useMemo(() => {
    const counts = { all: blogs.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = blogs.filter(
          (blog) => blog.section_type?.toLowerCase() === cat.id
        ).length;
      }
    });
    return counts;
  }, [blogs]);

  // If a blog is expanded, show only the expanded section
  if (expandedCardIndex !== null) {
    const expandedBlog = blogs[expandedCardIndex];
    return (
      <ExpandedBlogSection
        blog={expandedBlog}
        currentLanguage={currentLanguage}
        utils={utils}
        onClose={handleCloseExpanded}
        onImageClick={setFullImage}
      />
    );
  }

  return (
    <section
      className={`mt-20 min-h-screen bg-gray-50/50 py-12 text-gray-900 ${fontClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="mb-4">
            <h2
              className={`text-2xl md:text-3xl font-extrabold tracking-tight text-gray-700 ${fontClass}`}
            >
              {currentLanguage === "en"
                ? "Latest Insights"
                : "សកម្មភាពថ្មីៗ​ និង ព័ត៌មាន"}
            </h2>
          </div>
          <div className="h-1 w-60 bg-blue-600 rounded-full mb-6"></div>
          <p className={`text-lg text-gray-500 font-light ${fontClass}`}>
            {currentLanguage === "en"
              ? "Discover the latest news, updates, and stories from our team."
              : "ស្វែងយល់ពីព័ត៌មានថ្មីៗ និងអត្ថបទសំខាន់ៗពីំមន្ទីរពេទ្យយើង។"}
          </p>
        </div>

        {/* Enhanced Filter Controls */}
        <FilterControls
          currentLanguage={currentLanguage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          CATEGORIES={CATEGORIES}
          SORT_OPTIONS={SORT_OPTIONS}
        />

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
            <p className="font-semibold">Unable to load content.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm underline hover:text-red-800"
            >
              Reload Page
            </button>
          </div>
        )}

        {/* Blog Grid with Show More button as a grid item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) // Show 4 skeleton cards
            : filteredBlogs
                .slice(0, visibleCount)
                .map((blog, index) => (
                  <BlogCard
                    key={blog.id || blog.uniqueId || index}
                    blog={blog}
                    index={blogs.findIndex(
                      (b) =>
                        (b.id && b.id === blog.id) ||
                        b.uniqueId === blog.uniqueId
                    )}
                    currentLanguage={currentLanguage}
                    utils={utils}
                    onExpand={handleExpand}
                    onImageClick={setFullImage}
                  />
                ))}

          {/* Show More Button as a grid item that spans all columns */}
          {!loading && visibleCount < filteredBlogs.length && (
            <ShowMoreButton
              currentLanguage={currentLanguage}
              visibleCount={visibleCount}
              totalCount={filteredBlogs.length}
              onClick={handleShowMore}
              fontClass={fontClass}
            />
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className={`max-w-4xl mx-auto text-center py-20 ${fontClass}`}>
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3
                className={`text-xl font-bold text-gray-700 mb-2 ${fontClass}`}
              >
                {currentLanguage === "en"
                  ? "No posts found"
                  : "រកមិនឃើញអត្ថបទទេ"}
              </h3>
              <p className={`text-gray-500 mb-6 ${fontClass}`}>
                {currentLanguage === "en"
                  ? `No posts found for "${selectedCategory}". Try another category.`
                  : `រកមិនឃើញអត្ថបទសម្រាប់ "${
                      CATEGORIES.find((c) => c.id === selectedCategory)?.label
                        .km
                    }"។ សូមសាកល្បងប្រភេទផ្សេងទៀត។`}
              </p>
              <button
                onClick={resetFilters}
                className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors ${fontClass}`}
              >
                {currentLanguage === "en"
                  ? "Show All Posts"
                  : "បង្ហាញអត្ថបទទាំងអស់"}
              </button>
            </div>
          </div>
        )}

        {/* Total Results Info */}
        {!loading && filteredBlogs.length > 0 && (
          <div
            className={`mt-8 text-center text-sm text-gray-500 ${fontClass}`}
          >
            <p>
              {currentLanguage === "en"
                ? `Showing ${Math.min(visibleCount, filteredBlogs.length)} of ${
                    filteredBlogs.length
                  } posts`
                : `កំពុងបង្ហាញ ${Math.min(
                    visibleCount,
                    filteredBlogs.length
                  )} ក្នុងចំណោម ${filteredBlogs.length} អត្ថបទ`}
            </p>
          </div>
        )}
      </div>

      {fullImage && (
        <ImageModal
          fullImage={fullImage}
          closeFullImage={() => setFullImage(null)}
        />
      )}
    </section>
  );
};

export default Activity;