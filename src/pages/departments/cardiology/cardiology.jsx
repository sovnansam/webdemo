import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CardiologyHero from "./cardiology_hero";
import CardiologyService from "./cardiology_service";

const API_URL = "API/departments/cardiology/cardiology_web.php";

// ==========================================
// 1. UTILITIES
// ==========================================

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/cardiology/${imagePath}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const getCategoryData = (sectionType) => {
  const key = sectionType?.toLowerCase();
  const baseStyle = "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase";
  const categories = {
    blog: { label: { en: "Blog", km: "ប្លុក" }, style: "bg-blue-50 text-blue-600 border border-blue-100" },
    article: { label: { en: "Article", km: "អត្ថបទ" }, style: "bg-violet-50 text-violet-600 border border-violet-100" },
    news: { label: { en: "News", km: "ព័ត៌មាន" }, style: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
    technology: { label: { en: "Tech", km: "បច្ចេកវិទ្យា" }, style: "bg-sky-50 text-sky-600 border border-sky-100" },
    default: { label: { en: "Content", km: "មាតិកា" }, style: "bg-gray-50 text-gray-600 border border-gray-100" }
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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <img 
        src={fullImage.url} 
        alt={fullImage.title} 
        className="w-full h-full object-contain rounded-lg shadow-2xl"
      />
      <p className="mt-4 text-white/90 font-medium text-lg tracking-wide">{fullImage.title}</p>
    </div>
  </div>
);

// Font utility function
const getFontClass = (language) => {
  return language === 'km' 
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};

// Consistent Image component with fixed dimensions
const ConsistentImage = ({ src, alt, className = "", containerClassName = "", objectFit = "cover" }) => (
  <div className={`overflow-hidden ${containerClassName}`}>
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"} transition-all duration-500 ${className}`}
      loading="lazy"
      onError={(e) => {
        e.target.src = "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
      }}
    />
  </div>
);

const TopImageSection = ({ 
  blog, 
  utils, 
  activeImagePath,
  onGalleryClick,
  currentLanguage
}) => {
  const { getImageUrl, getTitle } = utils;
  const mainImageSrc = getImageUrl(activeImagePath);
  const fontClass = getFontClass(currentLanguage);

  return (
    <div className="mt-20 w-full border-b border-gray-100">
      {/* Main Hero Image - Fixed Size */}
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <ConsistentImage 
            src={mainImageSrc} 
            alt={getTitle(blog)} 
            objectFit="contain"
            containerClassName="w-full h-full"
          />
        </div>
      </div>

      {/* Gallery Strip - Fixed Size Thumbnails */}
      {blog.images && blog.images.length > 0 && (
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h4 className={`text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ${fontClass}`}>
              {currentLanguage === 'en' ? 'Image Gallery' : 'វិចិត្រសាល'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* Additional Image Thumbnails */}
              {blog.images.map((img, idx) => {
                const isActive = activeImagePath === img.image_path;
                return (
                  <div 
                    key={idx} 
                    className={`group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 ${isActive ? 'ring-2 ring-blue-500' : ''}`} 
                    onClick={() => onGalleryClick(img.image_path)}
                  >
                    <ConsistentImage 
                      src={getImageUrl(img.image_path)}
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
  const { getYouTubeEmbedUrl } = utils;
  const videoUrl = getYouTubeEmbedUrl(blog.youtube_url);
  const fontClass = getFontClass(currentLanguage);

  if (!videoUrl) return null;

  return (
    <div className="max-w-4xl mx-auto w-full px-6 pb-12 pt-8 border-t border-gray-100 mt-8">
      <h3 className={`text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 ${fontClass}`}>
        <span className="w-10 h-1 bg-red-600 rounded-full"></span>
        {currentLanguage === 'en' ? 'Video Content' : 'មាតិកាវីដេអូ'}
      </h3>
      <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
        <iframe src={videoUrl} className="w-full h-full" allowFullScreen title="Video" />
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
  onImageClick 
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGallerySwap = (newImagePath) => {
    setActiveHeaderImage(newImagePath);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Language Switcher */}
      <LanguageSwitcher 
        currentLanguage={currentLanguage} 
        onLanguageChange={(lang) => {
          localStorage.setItem("preferredLanguage", lang);
          window.location.reload();
        }} 
      />

      {/* Close Button - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={onClose}
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 font-semibold border border-gray-200 cursor-pointer ${fontClass}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {currentLanguage === "en" ? "Back to All Articles" : "ត្រលប់ទៅអត្ថបទទាំងអស់"}
            </button>
            
            <div className="flex items-center gap-3">
              <span className={`${categoryData.className} ${fontClass}`}>
                {currentLanguage === "en" ? categoryData.label.en : categoryData.label.km}
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

        <h1 className={`text-lg md:text-3xl sm:text-lg font-extrabold text-gray-900 leading-tight mb-8 ${fontClass}`}>
          {title}
        </h1>

        <p className={`text-xl text-gray-600 font-medium leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 py-2 ${fontClass}`}>
          {getDescription(blog)}
        </p>

        <div className={`prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line ${fontClass}`}>
          {content.split('\n\n').map((paragraph, idx) => (
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
  onImageClick
}) => {
  const { getTitle, getDescription, formatDate, getImageUrl } = utils;
  const categoryData = getCategoryData(blog.section_type);
  const title = getTitle(blog);
  const fontClass = getFontClass(currentLanguage);

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
          <span className={`${categoryData.className} bg-white/90 backdrop-blur-sm shadow-sm ${fontClass}`}>
            {currentLanguage === "en" ? categoryData.label.en : categoryData.label.km}
          </span>
        </div>
      </div>
      
      {/* Text Content with Consistent Padding */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3 text-xs text-gray-400 font-medium flex items-center gap-2">
          <span>{formatDate(blog.created_at)}</span>
        </div>
        <h3 className={`text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 ${fontClass}`}>
          {title}
        </h3>
        <p className={`text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1 ${fontClass}`}>
          {getDescription(blog)}
        </p>
        <div className={`pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all ${fontClass}`}>
          {currentLanguage === "en" ? "Read Article" : "អានអត្ថបទ"}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================

const Cardiology = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [visibleCount, setVisibleCount] = useState(8);

  const utils = useMemo(() => ({
    getTitle: (b) => currentLanguage === "en" ? b.title_en || b.title : b.title || b.title_en,
    getDescription: (b) => currentLanguage === "en" ? b.subTitle_en || b.subTitle : b.subTitle || b.subTitle_en,
    getMergedParagraphs: (b) => {
      let text = currentLanguage === "en" ? b.paragraph_en || b.paragraph : b.paragraph || b.paragraph_en;
      if (!text) return "";
      const paragraphs = [text];
      for (let i = 1; i <= 4; i++) {
         const p = currentLanguage === "en" ? b[`paragraph${i}_en`] || b[`paragraph${i}`] : b[`paragraph${i}`] || b[`paragraph${i}_en`];
         if (p) paragraphs.push(p);
      }
      return paragraphs.join("\n\n");
    },
    formatDate: (d) => {
      try { 
        return new Date(d).toLocaleDateString(
          currentLanguage === 'en' ? 'en-US' : 'km-KH', 
          { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }
        ); 
      } catch { return ""; }
    },
    getImageUrl, getYouTubeEmbedUrl
  }), [currentLanguage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 600)); 
        const res = await fetch(API_URL);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        setBlogs(data.map((b, i) => ({ ...b, uniqueId: i })));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    // Load language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") || 'km';
    setCurrentLanguage(savedLanguage);
    applyLanguageStyles(savedLanguage);
  }, []);

  // Apply language-specific styles
  const applyLanguageStyles = (language) => {
    document.documentElement.classList.remove('language-en', 'language-km');
    document.documentElement.classList.add(`language-${language}`);
    
    if (language === 'km') {
      document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
      document.body.style.unicodeBidi = '';
    }
  };

  const handleLanguageChange = (lang) => {
    // Save to localStorage
    localStorage.setItem("preferredLanguage", lang);
    // Update state
    setCurrentLanguage(lang);
    // Apply styles
    applyLanguageStyles(lang);
  };

  const handleExpand = useCallback((index) => {
    setExpandedCardIndex(index);
    document.body.style.overflow = "auto";
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedCardIndex(null);
    // Scroll to top when returning to grid view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fontClass = getFontClass(currentLanguage);

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

  // Normal grid view
  return (
<>

 <CardiologyHero currentLanguage={currentLanguage}/>
  <CardiologyService currentLanguage={currentLanguage}/>
  

    <section className={`mt-20 min-h-screen bg-gray-50/50 py-12 text-gray-900 ${fontClass}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Max Width */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight text-gray-700 mb-4 ${fontClass}`}>
            {currentLanguage === "en" ? "Latest Insights" : "ព័ត៌មាននិងចំណេះដឹង"}
          </h2>
          <div className="h-1 w-60 bg-blue-600 rounded-full mb-6"></div>
          <p className={`text-lg text-gray-500 font-light ${fontClass}`}>
            {currentLanguage === "en" 
              ? "Discover the latest news, updates, and stories from our team." 
              : "ស្វែងយល់ពីព័ត៌មានថ្មីៗ និងអត្ថបទសំខាន់ៗពីក្រុមការងាររបស់យើង។"}
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
            <p className="font-semibold">Unable to load content.</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-sm underline hover:text-red-800">Reload Page</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading 
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : blogs.slice(0, visibleCount).map((blog, index) => (
                <BlogCard 
                  key={blog.id || index}
                  blog={blog}
                  index={index}
                  currentLanguage={currentLanguage}
                  utils={utils}
                  onExpand={handleExpand}
                  onImageClick={setFullImage}
                />
              ))
          }
        </div>

        {!loading && blogs.length === 0 && !error && (
          <div className={`max-w-4xl mx-auto text-center py-20 text-gray-400 ${fontClass}`}>
            <p>{currentLanguage === 'en' ? 'No posts found.' : 'មិនមានអត្ថបទទេ។'}</p>
          </div>
        )}

        {!loading && visibleCount < blogs.length && (
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <button 
              onClick={() => setVisibleCount(p => p + 8)}
              className={`px-8 py-3 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all ${fontClass}`}
            >
              {currentLanguage === "en" ? "Load More Articles" : "បង្ហាញអត្ថបទបន្ថែម"}
            </button>
          </div>
        )}
      </div>

      {fullImage && (
        <ImageModal fullImage={fullImage} closeFullImage={() => setFullImage(null)} />
      )}
    </section>
       </>
  );
};

export default Cardiology;