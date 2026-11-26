import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "/API/blog/all_blog.php";

const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Missing";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `/API/blog/${imagePath}`;
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

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
    if (currentLanguage === 'km') {
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      document.body.style.unicodeBidi = '';
    }
  }, [currentLanguage]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

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

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch specific blog first
        const specificApiUrl = `API/blog/all_blog.php?id=${id}`;
        let response, data;
        
        try {
          response = await fetch(specificApiUrl);
          if (response.ok) {
            data = await response.json();
            // If we get a single blog object, use it directly
            if (data && typeof data === "object" && !Array.isArray(data)) {
              if (data.id || data.title) {
                setBlog(data);
                setActiveImage(data.image_path);
                setLoading(false);
                return;
              }
            }
          }
        } catch (specificApiError) {
          console.log("Specific API not available, falling back to all blogs");
        }
        
        // Fallback to fetching all blogs and filtering
        response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        data = await response.json();
        let blogsArray = [];
        
        // More robust data structure parsing
        if (data && typeof data === "object") {
          if (data.data && Array.isArray(data.data)) {
            blogsArray = data.data;
          } else if (data.blogs && Array.isArray(data.blogs)) {
            blogsArray = data.blogs;
          } else if (data.results && Array.isArray(data.results)) {
            blogsArray = data.results;
          } else if (Array.isArray(data)) {
            blogsArray = data;
          } else if (data.id || data.title) {
            // Single blog object
            blogsArray = [data];
          } else {
            throw new Error("Invalid API response structure");
          }
        } else {
          throw new Error("Invalid API response");
        }

        // Better ID comparison - handle both string and numeric IDs
        const targetId = id;
        const foundBlog = blogsArray.find(b => {
          const blogId = b.id;
          return String(blogId) === String(targetId) || Number(blogId) === Number(targetId);
        });
        
        if (foundBlog) {
          setBlog(foundBlog);
          setActiveImage(foundBlog.image_path || foundBlog.image);
        } else {
          setError(`Blog with ID ${id} not found`);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(`Failed to load blog: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      sessionStorage.setItem('lastVisitedBlogId', id);
      fetchBlog();
    } else {
      setError("No blog ID provided");
      setLoading(false);
    }
  }, [id]);

  const getTitle = (b) => {
    return currentLanguage === "en"
      ? b.title_en || b.title || "No Title"
      : b.title || b.title_en || "គ្មានចំណងជើង";
  };

  const getDescription = (b) => {
    return currentLanguage === "en"
      ? b.subTitle_en || b.subTitle || "No description available"
      : b.subTitle || b.subTitle_en || "គ្មានការពិពណ៌នា";
  };

  const getMergedParagraphs = (b) => {
    const paragraphs = [];
    const mainParagraph = currentLanguage === "en"
      ? b.paragraph_en || b.paragraph
      : b.paragraph || b.paragraph_en;
    if (mainParagraph && mainParagraph.trim() !== "") paragraphs.push(mainParagraph);

    for (let i = 1; i <= 4; i++) {
      const paragraphContent = currentLanguage === "en"
        ? b[`paragraph${i}_en`] || b[`paragraph${i}`]
        : b[`paragraph${i}`] || b[`paragraph${i}_en`];
      if (paragraphContent && paragraphContent.trim() !== "") paragraphs.push(paragraphContent);
    }
    return paragraphs.join("\n\n");
  };

  const formatDate = (dateString) => {
    if (!dateString) return currentLanguage === "en" ? "No date" : "គ្មានកាលបរិច្ឆេទ";
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return currentLanguage === "en"
        ? date.toLocaleDateString("en-US", options)
        : date.toLocaleDateString("km-KH", options);
    } catch {
      return dateString;
    }
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
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    const isNetworkError = error && (error.includes("Failed to fetch") || error.includes("Network"));
    const isNotFoundError = error && error.includes("not found");
    
    return (
      <section className="min-h-screen py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {isNotFoundError 
              ? (currentLanguage === "en" ? "Article not found" : "រកមិនឃើញអត្ថបទ")
              : (currentLanguage === "en" ? "Error loading article" : "កំហុសក្នុងការផ្ទុកអត្ថបទ")
            }
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {error && (
              <span className="block mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {currentLanguage === "en" ? "Error details:" : "ព័ត៌មានកំហុស:"} {error}
              </span>
            )}
            {isNotFoundError
              ? (currentLanguage === "en" 
                ? "The article you're looking for doesn't exist or may have been removed."
                : "អត្ថបទដែលអ្នកកំពុងស្វែងរកមិនមានទេ ឬប្រហែលជាត្រូវបានលុបចោល។")
              : (currentLanguage === "en"
                ? "We couldn't load this article. Please try again later."
                : "យើងមិនអាចផ្ទុកអត្ថបទនេះបានទេ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។")
            }
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {currentLanguage === "en" ? "Try Again" : "ព្យាយាមម្តងទៀត"}
            </button>
            <Link
              to="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {currentLanguage === "en" ? "Back to Articles" : "ត្រឡប់ទៅអត្ថបទ"}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const categoryData = getCategoryData(blog.section_type);
  const videoUrl = getYouTubeEmbedUrl(blog.youtube_url);

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
                  <Link to="/blog" className="text-gray-500 hover:text-gray-700 transition-colors">
                    {currentLanguage === "en" ? "Articles" : "អត្ថបទ"}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {getTitle(blog).substring(0, 30)}...
                </li>
              </ol>
            </nav>

            {/* Blog Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header with Category and Date */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex flex-wrap items-center justify-between">
                  <span className={categoryData.className}>
                    {currentLanguage === "en" ? categoryData.label.en : categoryData.label.km}
                  </span>
                  <span className="inline-flex text-sm text-yellow-600 font-medium px-3 py-1 rounded-full border border-gray-200">
                    {formatDate(blog.created_at)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="px-6 pt-2 pb-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  {getTitle(blog)}
                </h1>
              </div>

              {/* Main Image */}
              {activeImage && (
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 p-4">
                    <img
                      src={getImageUrl(activeImage)}
                      alt={getTitle(blog)}
                      className="max-h-96 w-auto object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Image+Load+Error";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {blog.images && blog.images.length > 0 && (
                <div className="px-6 pt-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                    {currentLanguage === "en" ? "Image Gallery" : "វិចិត្រសាល"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
                    {blog.images.map((img, idx) => {
                      const isActive = activeImage === img.image_path;
                      return (
                        <div
                          key={idx}
                          className={`group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 ${isActive ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => setActiveImage(img.image_path)}
                        >
                          <img
                            src={getImageUrl(img.image_path)}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/300x200/f3f4f6/9ca3af?text=No+Image";
                            }}
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="px-6 pt-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {getDescription(blog)}
                </p>
              </div>

              {/* Full Content */}
              {getMergedParagraphs(blog) && (
                <div className="px-6 pt-6">
                  <div className="prose prose-lg prose-gray max-w-none">
                    {getMergedParagraphs(blog)
                      .split("\n\n")
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="mb-6 text-gray-700 leading-relaxed break-words"
                          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* YouTube Video */}
              {videoUrl && (
                <div className="px-6 pt-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-10 h-1 bg-red-600 rounded-full"></span>
                    {currentLanguage === "en" ? "Video Content" : "មាតិកាវីដេអូ"}
                  </h3>
                  <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
                    <iframe src={videoUrl} className="w-full h-full" allowFullScreen title="Video" />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="px-6 py-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

export default BlogDetail;
