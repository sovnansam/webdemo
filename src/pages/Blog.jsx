import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../contexts/scrollTop";
const API_URL = "API/blog/all_blog.php";



const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/blog/${imagePath}`;
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

// ==========================================
// 4. MAIN CARD COMPONENT (Grid View)
// ==========================================

const BlogCard = ({ 
  blog, 
  currentLanguage, 
  utils, 
  onImageClick
}) => {
  const { getTitle, getDescription, formatDate, getImageUrl } = utils;
  const categoryData = getCategoryData(blog.section_type);
  const title = getTitle(blog);
  const fontClass = getFontClass(currentLanguage);

  return (
    <Link 
      to={`/blog/${blog.id}`}
      data-blog-card
      data-blog-id={blog.id}
      tabIndex={0}
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-4 focus:border-blue-500 ${fontClass}`}
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
    </Link>
  );
};

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

  const utils = useMemo(() => ({
    getTitle: (b) => {
      if (currentLanguage === "km") {
        // First try Khmer title, fallback to English if Khmer is empty
        return b.title && b.title.trim() !== "" ? b.title : b.title_en || "No Title";
      } else {
        // English: try English title, fallback to Khmer
        return b.title_en && b.title_en.trim() !== "" ? b.title_en : b.title || "No Title";
      }
    },
    
    getDescription: (b) => {
      if (currentLanguage === "km") {
        return b.subTitle && b.subTitle.trim() !== "" ? b.subTitle : b.subTitle_en || "";
      } else {
        return b.subTitle_en && b.subTitle_en.trim() !== "" ? b.subTitle_en : b.subTitle || "";
      }
    },
    
    getMergedParagraphs: (b) => {
      const paragraphs = [];
      
      if (currentLanguage === "km") {
        // Try Khmer paragraphs first
        const mainPara = b.paragraph && b.paragraph.trim() !== "" ? b.paragraph : b.paragraph_en || "";
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
        // English paragraphs first
        const mainPara = b.paragraph_en && b.paragraph_en.trim() !== "" ? b.paragraph_en : b.paragraph || "";
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
    
    getImageUrl, 
    getYouTubeEmbedUrl
    
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
    
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage") || 'km';
    setCurrentLanguage(savedLanguage);
    applyLanguageStyles(savedLanguage);
  }, []);

  // Add scroll event listener to show/hide scroll to top button
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

        useEffect(() => {
          const scrollToHash = () => {
            const hash = window.location.hash;
            if (!hash) return;
      
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            } else {
              // Retry after mount
              setTimeout(scrollToHash, 300);
            }
          };
      
          scrollToHash();
        }, []);

        useEffect(() => {
          // Focus on previously visited blog card when navigating back
          const previousBlogId = sessionStorage.getItem('lastVisitedBlogId');
  
          
          if (previousBlogId && blogs.length > 0) {
            // Check if the target blog is in the currently displayed set
            const targetBlog = blogs.find(blog => String(blog.id) === String(previousBlogId));
            const displayedBlogs = showAll ? blogs : blogs.slice(0, visibleCount);
            const isTargetDisplayed = displayedBlogs.some(blog => String(blog.id) === String(previousBlogId));
            
   
            
            // If target blog is not displayed, show more blogs or show all
            if (!isTargetDisplayed && targetBlog) {
              const targetIndex = blogs.findIndex(blog => String(blog.id) === String(previousBlogId));

              
              if (targetIndex < visibleCount) {
                // Should be visible, but might not be due to pagination
                setVisibleCount(Math.max(visibleCount, targetIndex + 1));
              } else if (targetIndex < blogs.length) {
                // Show all blogs to ensure target is visible
                setShowAll(true);
              }
            }
            
            // Wait a bit longer for DOM to be ready and for any state changes to take effect
            setTimeout(() => {
              const blogCard = document.querySelector(`[data-blog-id="${previousBlogId}"]`);
            
              
              if (blogCard) {
                // Add visual indicator for debugging
                blogCard.style.border = '2px solid #00d9ff';
                blogCard.focus();
                blogCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
             
                
                // Remove debug border after 2 seconds
                setTimeout(() => {
                  blogCard.style.border = '';
                }, 2000);
              } else {
                console.log('Blog card not found for ID:', previousBlogId); // Debug log
              }
              
              // Clear the stored ID after attempting to focus
              sessionStorage.removeItem('lastVisitedBlogId');
            }, 800); // Increased delay to allow for state changes
          }
        }, [blogs, visibleCount, showAll]);

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

  const fontClass = getFontClass(currentLanguage);

  
  // Calculate which blogs to show
  const displayedBlogs = showAll ? blogs : blogs.slice(0, visibleCount);
  const hasMoreBlogs = blogs.length > displayedBlogs.length;

  // Normal grid view
  return (
    <>
    <section className={`mt-10 md:mt-15 min-h-screen bg-gray-50/50 py-12 text-gray-900 ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="mb-4">
            <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight text-gray-700  ${fontClass}`}>
              {currentLanguage === "en" ? "Latest Insights" : "ព័ត៌មាន និង ចំណេះដឹង"}
            </h2>
          </div>
         <div className="h-1 w-full md:w-65 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-6 animate-pulse [animation-duration:2s]"></div>
          <p className={`text-sm md:text-lg text-gray-500 font-light ${fontClass}`}>
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

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading 
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : displayedBlogs.map((blog, index) => (
                <BlogCard 
                  key={blog.id || index}
                  blog={blog}
                  currentLanguage={currentLanguage}
                  utils={utils}
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

        {/* Show More/Less Buttons */}
        {!loading && blogs.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 text-center">
            {hasMoreBlogs && !showAll ? (
              <>
                <button 
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className={`px-8 py-3 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all mr-4 ${fontClass}`}
                >
                  {currentLanguage === "en" ? "Load 4 More" : "បង្ហាញ ៤ ទៀត"}
                </button>
                <button 
                  onClick={() => setShowAll(true)}
                  className={`px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md hover:bg-blue-700 transition-all ${fontClass}`}
                >
                  {currentLanguage === "en" ? "Show All" : "បង្ហាញទាំងអស់"}
                </button>
              </>
            ) : showAll ? (
              <button 
                onClick={() => {
                  setShowAll(false);
                  setVisibleCount(8);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-8 py-3 bg-gray-100 border border-gray-300 text-gray-900 font-semibold rounded-xl shadow-sm hover:shadow-md hover:bg-gray-200 transition-all ${fontClass}`}
              >
                {currentLanguage === "en" ? "Show Less" : "បង្ហាញតិចជាងនេះ"}
              </button>
            ) : null}
            
            {/* Show count indicator */}
            {!showAll && displayedBlogs.length > 0 && (
              <p className={`mt-4 text-sm text-gray-500 ${fontClass}`}>
                {currentLanguage === "en" 
                  ? `Showing ${displayedBlogs.length} of ${blogs.length} articles`
                  : `កំពុងបង្ហាញ ${displayedBlogs.length} ក្នុងចំណោម ${blogs.length} អត្ថបទ`}
              </p>
            )}
          </div>
        )}
      </div>

      {fullImage && (
        <ImageModal fullImage={fullImage} closeFullImage={() => setFullImage(null)} />
      )}
    </section>

      <ScrollToTopButton isVisible={isVisible} />
      </>
  );
};

export default Blog;